import {
    assign,
    createMachine
} from "xstate";
import {
    helperActions
} from "@/utils/machine-helpers";
import {
    getPlans
} from "@/lib/plans";
import {
    createCheckout
} from "@/lib/data/users";
import currencies from "@/utils/currencies";
import {
    get,
    toInteger,
    sortBy
} from 'lodash-es'

const initialState = {
    errors: [],
    currency: "usd",
    interval: "month",
    plans: {},
};

export default createMachine({
    id: "planSelector",

    initial: "loading",

    context: {
        ...initialState,
    },

    states: {
        loading: {
            invoke: {
                src: "getPlans",
            },
            on: {
                SUCCESS: {
                    target: "#ready",
                    actions: [
                        "assignPlans",
                        {
                            type: "analyticsTrackEvent",
                            analyticsEvent: "ViewPlans",
                        },
                        "assignFilteredPlans",
                    ],
                },
                ERROR: {
                    target: "#error",
                    actions: "assignErrors",
                },
            },
        },
        ready: {
            id: "ready",
            on: {
                BILLING_PERIOD_CHANGE: {
                    actions: ["assignInterval", "assignFilteredPlans"],
                },
                CURRENCY_CHANGE: {
                    actions: ["assignCurrency", "assignFilteredPlans"],
                },
                PLAN_SELECTED: {
                    target: "#checkout",
                },
            },
        },
        checkout: {
            id: "checkout",
            invoke: {
                src: "checkout",
            },
            on: {
                CHECKOUT_SUCCESS: {
                    target: "#success",
                    actions: [{
                            type: "analyticsTrackEvent",
                            analyticsEvent: "Checkout",
                        },
                        "redirectToCheckoutUrl"
                    ],
                },
                CHECKOUT_ERROR: {
                    target: "#error",
                    actions: "assignErrors",
                },
            },
        },
        success: {
            id: "success",
            type: "final",
        },
        error: {
            id: "error",
        },
    },
}, {
    actions: {
        ...helperActions,
        assignCurrency: assign((_, {
            currency
        }) => ({
            currency
        })),
        assignInterval: assign((_, {
            annualBilling
        }) => ({
            interval: annualBilling ? "year" : "month",
        })),
        assignFilteredPlans: assign(({
            plans,
            currency,
            interval
        }) => {


            // Map plans to filter the prices by currency and interval
            const filteredPlans = plans.map((plan) => {
                const prices = plan ? .prices ? .filter(
                    (price) =>
                    price.currency === currency && price.interval === interval
                );

                //we add a sort value based on the position metadata we have
                const position = get(plan, "metadata.position", "10");

                // Get the first price if there are multiple prices
                const [head] = prices;

                // Set pretty price
                const priceDivisor =
                    interval === "year" ?
                    head ? .interval_count * 12 :
                    head ? .interval_count * 1;

                const prettyPrice = parseFloat(
                    head ? .unit_amount / 100 / priceDivisor
                ).toFixed(2);
                if (head)
                    head.prettyPrice = `${currencies[currency] || "$"}${prettyPrice}`;

                return {
                    ...plan,
                    price: head,
                    position: toInteger(position)
                };
            });

            // sort by position
            const sortedPlans = sortBy(filteredPlans, "position");

            return {
                filteredPlans: sortedPlans,
            };
        }),
        assignPlans: assign((_, {
            plans
        }) => ({
            plans
        })),
    },
    services: {
        checkout:
            (_, {
                planId,
                priceId
            }) =>
            async (send) => {
                let unsubscribe;
                const snapShotCallback = (doc) => {
                    const {
                        error,
                        url
                    } = doc.data()

                    if (error) {
                        // Show an error to your customer and
                        // inspect your Cloud Function logs in the Firebase console.
                        send({
                            type: 'CHECKOUT_ERROR',
                            error: new Error(`An error occured: ${error.message}`)
                        })

                        if (typeof unsubscribe === 'function') unsubscribe()
                    }

                    if (url) {
                        // We have a Stripe Checkout URL, let's redirect.
                        send({
                            type: 'CHECKOUT_SUCCESS',
                            url
                        })

                        if (typeof unsubscribe === 'function') unsubscribe()
                    }
                }

                try {
                    // createCheckout returns onSnapshot which is an observable - it gets auto unsubscribed when the state is exited.
                    unsubscribe = await createCheckout({
                        planId,
                        priceId,
                        snapShotCallback,
                    });
                } catch (error) {
                    console.log(error)
                    send({
                        type: 'CHECKOUT_ERROR',
                        error
                    })
                }
            },
        getPlans: () => async (send) => {
            try {
                const plans = await getPlans();

                send({
                    type: "SUCCESS",
                    plans
                });
            } catch (error) {
                send({
                    type: "ERROR",
                    error
                });
                console.error(error);
            }
        },
    },
    // guards: {
    // },
});