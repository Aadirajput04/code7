import {
    get,
    isEmpty,
    includes,
    forEach
} from 'lodash-es'
import {
    httpsCallable
} from 'firebase/functions'
import {
    firebaseAuth,
    functions
} from '@/modules/firebase.js'
import {
    getSubscriptions
} from "./data/users.js"
import {
    getAll
} from './data/plans'

/**
 * Feature constants which map to the featureId possibilities in Stripe
 * We use this const map so that if the values ever update on Stripe, we have a single point of update
 */
const FEATURES = {
    customDomain: 'customDomain',
    exportLeads: 'exportLeads',
    customAnalytics: 'customAnalytics',
    removeBranding: 'removeBranding',
    addVideos: 'addVideos'
}


// This mapping maintains the feature to plan map for the site
// TODO: move this as a shared JSON between frontend and backend
const PLAN_MAPPING = {
    basicPlan: {
        sites: 1,
        features: [
            FEATURES.customDomain,
            FEATURES.exportLeads,
            FEATURES.customAnalytics,
            FEATURES.removeBranding,
            FEATURES.addVideos,
        ]
    },
    starterPlan: {
        sites: 3,
        features: [
            FEATURES.customDomain,
            FEATURES.exportLeads,
            FEATURES.customAnalytics,
            FEATURES.removeBranding,
            FEATURES.addVideos,
        ]
    },
    proPlan: {
        sites: 15,
        features: [
            FEATURES.customDomain,
            FEATURES.exportLeads,
            FEATURES.customAnalytics,
            FEATURES.removeBranding,
            FEATURES.addVideos,
        ]
    }
}

/**
 * Returns the custom claim stored for the role
 *
 * @returns {string} Custom claim for StripeRole
 */
const getCustomClaimRole = async () => {
    if (get(firebaseAuth, 'currentUser', null) === null) {
        throw new Error('No auth user available to get custom claims')
    }

    // This performs force-refresh the user token to ensure fresh token and claims
    await firebaseAuth ? .currentUser ? .getIdToken(true)
    const decodedToken = await firebaseAuth ? .currentUser ? .getIdTokenResult()

    return get(decodedToken, 'claims.stripeRole', '')
}

/**
 * Gets plans that have access to a particular feature
 *
 * @param {*} featureId
 * @returns {[String]} Array of plan ids
 */
const getPlansWithFeature = (featureId) => {
    const plans = []
    // returns an array of plans that this feature is available on
    forEach(PLAN_MAPPING, (plan, planId) => {
        const hasFeature = includes(plan.features, featureId);
        if (hasFeature) {
            plans.push(planId);
        }
    })
    return plans;
}

/**
 * Performs a feature check against the current logged in user.
 * Possible feature ids: team, customDomain, exportLeads
 * Use the included FEATURES to pass in the feature you are testing (eg canAccessFeature(FEATURES.customDomain))
 *
 * @param {string} featureId Represents a feature
 * @returns {boolean} Returns true is user can access feature
 */
const canAccessFeature = async (featureId) => {
    let canAccess = false;
    if (isEmpty(featureId)) {
        return false
    }

    // features can not be accessed by non users
    if (firebaseAuth ? .currentUser ? .uid === undefined) {
        return false;
    }

    // check which plans are required to have this feature
    const plansRequired = getPlansWithFeature(featureId);

    // we need to check the subscription in the database and see if the active subscription includes the feature
    const subscriptions = await getSubscriptions();

    forEach(subscriptions, (subscription) => {
        const subscriptionDetails = subscription.role;

        // for each active subscription, we want to check if they are subscribed to a plan with the feature
        forEach(plansRequired, planId => {
            // if the subscription includes the plan that has access to this feature then allow access
            if (includes(subscriptionDetails, planId)) {
                canAccess = true;
            }
        })
    })

    return canAccess;
}


/**
 * Checks to see if the logged in user is on a paid plan
 *
 * @returns {boolean} True if user is on a paid plan
 */
const onPaidPlan = async () => {
    try {
        // we store the accessible features against the custom claim on the auth
        const authFeatures = await getCustomClaimRole()

        return !isEmpty(authFeatures)
    } catch (error) {
        return false
    }
}
const getCustomPortalUrl = async (returnUrl) => {
    const functionRef = httpsCallable(functions, 'ext-firestore-stripe-payments-createPortalLink')

    const {
        data
    } = await functionRef({
        returnUrl,
        locale: 'auto', // Optional, defaults to "auto"
    })
    return data.url
}

/**
 * Gets a collection of plans back from the database
 *
 * @returns
 */
const getPlans = async () => {
    const plans = await getAll();
    return plans;
}

export {
    getPlans,
    getCustomPortalUrl,
    canAccessFeature,
    onPaidPlan,
    FEATURES,
}