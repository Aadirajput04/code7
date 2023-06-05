import {
    doc,
    getDoc
} from 'firebase/firestore'
import {
    firestore as db
} from '@/modules/firebase.js'

/**
 * Gets idea with a id.
 *
 * @param {string} ideaId
 * @returns {object} idea
 */
const get = async (ideaId) => {
    try {
        const ref = doc(db, 'ideas', ideaId)
        const docSnap = await getDoc(ref)

        if (!docSnap.exists)
            throw new Error('Idea not found')

        else
            return docSnap.data()
    } catch (error) {
        console.error(error)
    }
}


export {
    get
}