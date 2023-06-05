import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where
} from 'firebase/firestore'
import {
    firestore as db
} from '@/modules/firebase.js'

/**
 * Gets plans from db.
 *
 * @returns {[object]} plans with child array of prices
 */
const getAll = async () => {
    try {
        const plans = []
        const prices = []

        // gets plans where active
        const plansRef = collection(db, 'plans')
        const plansQuery = query(plansRef,
            where('active', '==', true),
            where('metadata.inPlanSelector', '==', 'true'))
        const plansSnapshot = await getDocs(plansQuery)

        // loop through plans and add each plan to array - get prices via promise all
        const promises = []
        plansSnapshot.forEach((doc) => {
            plans.push({
                id: doc.id,
                ...doc.data(), // doc.data() is never undefined for query doc snapshots
            })

            const pricesRef = collection(db, 'plans', doc.id, 'prices')
            const pricesQuery = query(pricesRef, where('active', '==', true))

            promises.push(getDocs(pricesQuery))
        })

        // loop through prices collection and add to prices array
        const results = await Promise.all(promises)
        results.forEach((querySnapshot) => {
            querySnapshot.forEach((price) => {
                prices.push({
                    id: price.id,
                    ...price.data(), // doc.data() is never undefined for query doc snapshots
                })
            })
        })

        // we merge the prices into the plans and return them
        return plans.map(plan => ({
            ...plan,
            prices: prices.filter(price => price.product === plan.id),
        }))
    } catch (error) {
        console.error(error)
    }
}

const getPlan = async (planId) => {
    try {
        // gets plans where active
        const plansRef = doc(db, 'plans', planId)
        const planSnap = await getDoc(plansRef)
        return (planSnap.exists()) ? planSnap.data() : {}
    } catch (error) {
        console.error(error)
    }
}

const getPrice = async (planId, priceId) => {
    try {
        // gets plans where active
        const plansRef = doc(db, 'plans', planId, 'prices', priceId)
        const planSnap = await getDoc(plansRef)
        return (planSnap.exists()) ? planSnap.data() : {}
    } catch (error) {
        console.error(error)
    }
}

export {
    getAll,
    getPlan,
    getPrice
}