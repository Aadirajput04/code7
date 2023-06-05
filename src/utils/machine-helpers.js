/* eslint-disable no-console */
import {
    assign
} from "xstate";
import {
    DEVELOPMENT,
    SSR
} from "~/utils/constants.js";
import {
    logger
} from "@/utils/index.js";
import {
    GA_EVENTS,
    trackEvent
} from "@/lib/analytics.js";
const {
    VITE_APP_ENV
} =
import.meta.env

let postRobot;

const createGroupLogTitle = (state, label) => {
    const title =
        "🔔 " + state ? .event ? .type + " 🗒 " + JSON.stringify(state ? .value, null, 0);

    return console.groupCollapsed(
        label ? `❎%c ${label}:` : "State Service:",
        "color: #bada55",
        title
    );
};

const logEventType = (state) => {
    if (state ? .event ? .type) {
        console.groupCollapsed("🔔%c Event:", "color: #fbbf24", state ? .event ? .type);

        console.group("Event Payload:");
        for (const [key, value] of Object.entries(state ? .event)) {
            if (value && typeof value === "object") {
                console.group(`${key} (${typeof value})`);

                // To prevent console noise just log the first 3 items unfolded...
                if (Object.entries(value).length < 3) {
                    for (const [k, v] of Object.entries(value))
                        if (k && v) {
                            console.log(k, v)
                        }
                } else {
                    // Or the rest folded
                    console.log(value);
                }
                console.groupEnd();
            } else {
                console.log(`${key}: ${value} (${typeof value})`);
            }
        }
        console.groupEnd();

        console.groupEnd();
    }
};

const loopContext = (context) => {
    for (const [key, value] of Object.entries(context)) {
        if (value && typeof value === "object") {
            console.groupCollapsed(`${key} (${typeof value})`);

            // To prevent console noise just log the first 3 items unfolded...
            if (Object.entries(value).length < 3) {
                for (const [k, v] of Object.entries(value))
                    if (k && v) {
                        console.log(k, v)
                    }
            } else {
                // Or the rest folded
                console.log(value);
            }
            console.groupEnd();
        } else {
            console.log(`${key}: ${value} (${typeof value})`);
        }
    }
};

const logContext = (state) => {
    console.group("🫙%c Context", "color: #17D3C8");
    if (state ? .context) loopContext(state ? .context);
    console.groupEnd();
};

const logChildServices = (state) => {
    if (state ? .children) {
        console.group("🚸%c Child Services", "color: #F5F0D9");
        for (const [key, value] of Object.entries(state.children)) {
            if (value && typeof value === "object") {
                console.group(`${key} (${typeof value})`);

                const childState = state.children[key] ? .state;

                createGroupLogTitle(childState, key);

                // Log the event that caused the transition...
                logEventType(childState);

                // Log out the context and iterate over it's properties to format it nicely...
                logContext(childState);

                // Close the group log
                console.groupEnd();
                console.groupEnd();
            } else {
                console.log(`${key}: ${value} (${typeof value})`);
            }
        }
        console.groupEnd();
    }
};

// watchService is used for logging state updates to the console...
export const watchService = (service, label = "") => {
    if (!service) {
        console.error(`watchService can't init for ${label}`);
        return false;
    }

    if (VITE_APP_ENV !== 'production' && !
        import.meta.env.SSR) {
        service.onTransition((state) => {
            createGroupLogTitle(state, label);

            // Log the event that caused the transition...
            logEventType(state);

            // Log out the context and iterate over it's properties to format it nicely...
            logContext(state);

            // Log out any child services...
            logChildServices(state);

            // Close the group log
            console.groupEnd();
        });
    }
};

// Actions
// Default actions we use in most state machines...
export const helperActions = {
    analyticsTrackEvent: (ctx, ev, {
        action
    }) => action ? .analyticsEvent && trackEvent(GA_EVENTS[action.analyticsEvent]),
    assignErrors: assign({
        errorMessage: (_, {
            data,
            error,
            errorMessage
        }) => {
            let message = errorMessage || error ? .message || data ? .message || "Unknown error";

            message = message ? .replace("FirebaseError: ", "")

            if (message === 'internal') {
                message = 'Please try again or contact support.'
            }

            return message
        },
        errors: (_, {
            error,
            errors
        }) => {
            const errorList = [error] || errors || [];
            const errorMessages = errorList.map((error) =>
                error ? .message ? error ? .message ? .replace("FirebaseError: ", "") : error
            );

            return errorMessages.length > 0 ? errorMessages : ["Unknown error"];
        },
    }),
    redirectToCheckoutUrl: (_, {
        url
    }) => window.location.assign(url),
    resetErrors: assign({
        errorMessage: "",
        errors: [],
    }),
    resetState: assign({}),
    showToast: ({
        toast
    }, ev, {
        action
    }) => {
        toast ? .open({
            message: action ? .message || "",
            type: action ? .toastType || "default",
            ...(action ? .toastOptions || {}),
        });
    },
    trackErrors: (context, event, {
        state
    }) => {
        logger.error(event ? .data || event ? .error, {
            label: 'Machine Error',
            event: event ? .type,
            machine: state ? .machine ? .id,
            errorEventType: event ? .data ? .type || event ? .errorEventType,
            state: state ? .value,
            context
        });
    },
    updatePreviewFrame: async (context, event, {
        state
    }) => {
        if (!SSR && !postRobot) {
            postRobot = await
            import ("post-robot").then(pr => pr.default);
        }

        const {
            previewFrame,
            reselectingImages,
            siteId
        } = context;

        // We expect previewFrame to be a reactive ref
        const frame = previewFrame ? .value ? .contentWindow;

        // Get the siteData from the context or the idea
        const siteData = context ? .siteData || context ? .idea ? .siteData

        if (frame) {
            await postRobot.send(frame, 'updatePage', {
                reselectingImages,
                siteData,
                siteId
            }).catch((error) => {
                if (event ? .type === 'UPDATE_SITE_DATA') {
                    // Ignore errors in this state as the iframe hasn't had a chance to load and Formkit is triggering the "UPDATE_SITE_DATA" event due to it always firing it's @input event when it loads with mismatching schema and data
                    return;
                } else {
                    // Handle any errors that stopped our call from going through
                    logger.error(error, {
                        label: 'Post Robot Error',
                        event: event ? .type,
                        machine: state ? .machine ? .id,
                        errorEventType: event ? .data ? .type || event ? .errorEventType,
                        state: state ? .value,
                    });
                }

            });
        } else {
            console.log(`No frame found for ${event.type} in ${state.machine.id}`)
        }
    },
};

// Services
export const parallelServices = (services) => {
    return {
        type: 'parallel',
        states: services.reduce((acc, {
            src,
            actions
        }) => {
            return {
                ...acc,
                [src]: {
                    initial: 'run',
                    states: {
                        run: {
                            invoke: {
                                src,
                                onDone: {
                                    actions,
                                    target: 'done'
                                }
                            }
                        },
                        done: {
                            type: 'final' // <<< To get the parent state `onDone` we need to land into a `final` state per service.
                        }
                    }
                }
            }
        }, {})
    }
}