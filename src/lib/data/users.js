import {
    addDoc,
    collection,
    getDocs,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import {
    firebaseAuth,
    firestore as db
} from '@/modules/firebase'
import {
    getClientReferenceId
} from "@/utils/rewardful";

/**
 * Creates a checkout in the users collection
 *
 * @returns {[object]}
 */
const createCheckout = async ({
    hostUrl = `${window.location.protocol}//${window.location.host}`,
    planId,
    priceId,
    snapShotCallback,
    mode = 'subscription',
    discounts = [],
}) => {
    try {
        // Add new checkout session
        const data = {
            price: priceId,
            mode,
            allow_promotion_codes: true,
            success_url: `${hostUrl}/checkout/success?uid=${firebaseAuth.currentUser.uid}&planId=${planId}&pid=${priceId}`,
            cancel_url: `${window.location.href}`,
            discounts,
        };

        // Stripe Checkout will raise an error if clientReferenceId is set to a blank value so we add it here. client_reference_id is used by Rewardful to track partners
        const clientReferenceId = getClientReferenceId()
        if (clientReferenceId) data.client_reference_id = clientReferenceId

        const docRef = await addDoc(collection(db, 'users', firebaseAuth.currentUser.uid, 'checkout_sessions'), data)

        // Wait for the CheckoutSession to get attached by the extension
        return onSnapshot(docRef, snapShotCallback)
    } catch (error) {
        console.error(error)
    }
}

const getSubscriptions = async () => {
    const subscriptionRef = collection(db, 'users', firebaseAuth.currentUser.uid, 'subscriptions')
    const subQuery = query(subscriptionRef, where('status', 'in', ['trialing', 'active']))
    const snapshot = await getDocs(subQuery)
    const subscription = []
    snapshot.forEach((sub) => {
        subscription.push({
            ...sub.data()
        })
    })

    return subscription
}

export {
    createCheckout,
    getSubscriptions
};