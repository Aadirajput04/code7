import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    limit,
    onSnapshot,
    orderBy,
    query,
    updateDoc,
    where
} from 'firebase/firestore'
import {
    child,
    ref,
    get as rtdbGet,
    set
} from 'firebase/database'
import {
    uid
} from 'uid/single'
import {
    firestore as db,
    rtdb
} from '@/modules/firebase.js'

/**
 * Creates a site for the current user
 *
 * @param {string} userId The current account who is attempting to create the site
 * @param {string} siteDataId The id for the site data stored in RTDB for this site
 * @return {string} siteId for the created site
 */
const create = async (userId, siteDataId) => {
    // create a site and add the created account as owner
    const sitesRef = collection(db, 'sites')
    const site = {
        siteDataId,
        dateCreated: new Date().toISOString(),
        users: {
            [userId]: 'owner',
        },
    }
    const siteRef = await addDoc(sitesRef, site)

    return {
        siteId: siteRef.id,
        site,
    }
}

/**
 * Gets a site with a site id.
 *
 * @param {string} siteId
 * @returns {object} site
 */
const getWithSiteId = async (siteId) => {
    // One off
    try {
        const siteRef = doc(db, 'sites', siteId)
        const docSnap = await getDoc(siteRef)

        if (!docSnap.exists)
            throw new Error('Site not found')

        else
            return docSnap.data()
    } catch (error) {
        console.error(error)
    }
}

/**
 * Subscribe to a site with realtime updates
 *
 * @param {string} siteId
 * @param {object} data
 * @returns {object} site
 */
const update = async (siteId, data) => {
    try {
        const siteRef = doc(db, 'sites', siteId)

        return await updateDoc(siteRef, data);
    } catch (error) {
        console.error(error)
    }
}

/**
 * Subscribe to a site with realtime updates
 *
 * @param {string} siteId
 * @returns {object} site
 */
const subscribeWithSiteId = async (siteId, callback = null, errorHandler = null) => {
    const siteRef = doc(db, 'sites', siteId)

    return onSnapshot(siteRef, callback, errorHandler);
}

/**
 * Gets a site with a domain. This is used to check to ensure subdomain is unique
 *
 * @param {string} subdomain
 * @returns {Array} Array of sites
 */
const getWithSubdomain = async (subdomain) => {
    const sites = []
    const sitesRef = collection(db, 'sites')

    const sitesQuery = query(sitesRef, where('subdomain', '==', subdomain))
    const querySnapshot = await getDocs(sitesQuery)

    const snapshot = await sites.where('subdomain', '==', subdomain).get()
    if (snapshot.empty) {
        console.log('No matching documents.')
        return
    }

    querySnapshot.forEach((doc) => {
        const {
            subdomain,
            users,
            siteDataId
        } = doc.data()
        sites.push({
            id: doc.id,
            subdomain,
            users,
            siteDataId,
        })
    })

    return sites
}

const getSites = async (uid) => {
    const sitesRef = collection(db, 'sites')

    const siteQuery = query(sitesRef, where(`users.${uid}`, '!=', false))

    // TODO: Add index to allow order by date field with users where
    // siteQuery = query(siteQuery, orderBy('dateCreated', 'desc'))

    const snapshot = await getDocs(siteQuery)

    const sites = []
    snapshot.forEach((doc) => {
        sites.push({
            ...doc.data(),
            id: doc.id,
        })
    })

    return sites
}

/**
 * Gets leads sub-collection from the site
 *
 * @param {*} siteId
 * @param {int} limit the number of records to return
 * @return {[leads]} Array containing lead object (email, dateCreated)
 */
const getLeads = async (siteId, count = 1000) => {
    const sitesRef = collection(db, 'sites', siteId, 'leads')

    const siteQuery = query(sitesRef, orderBy('dateCreated', 'desc'), limit(count))
    const snapshot = await getDocs(siteQuery)

    const leads = []
    snapshot.forEach((doc) => {
        leads.push({
            ...doc.data(),
            email: doc.id,
        })
    })

    return leads
}

/**
 * Saves site content to RTDB
 *
 * @param {object} siteData The site data for the site
 * @return {string} siteDataId The id for the created site data
 */
const saveContent = async (siteData, siteDataId = '', newSite = false) => {
    if (!siteDataId && !newSite) throw Error('No siteDateId provided and newSite is false')

    let id = siteDataId

    if (newSite === true) {
        // If site data id is not provided, create a new one
        const timestamp = Math.floor(new Date().getTime() / 1000)
        id = `${timestamp}-${uid()}`
    }

    try {
        await set(ref(rtdb, `sites/${id}`), siteData)

        return id
    } catch (error) {
        console.error(error)
    }
}

/**
 * Loads site content from RTDB
 *
 * @param {object} siteDataId - The site data id for the site
 * @return {string} siteDataId The id for the created site data
 */
const loadContent = async (siteDataId) => {
    const dbRef = ref(rtdb)

    return rtdbGet(child(dbRef, `sites/${siteDataId}`)).then((snapshot) => {
        if (snapshot.exists())
            return snapshot.val()

        throw new Error('Site data not found')
    }).catch((error) => {
        console.error(error)
    })
}

export {
    create,
    getWithSiteId,
    getWithSubdomain,
    getSites,
    getLeads,
    loadContent,
    saveContent,
    subscribeWithSiteId,
    update
}