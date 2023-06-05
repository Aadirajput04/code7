import {
    httpsCallable
} from "firebase/functions";
import {
    first,
    get,
    isUndefined,
    map,
    reverse,
    sortBy
} from "lodash-es";
import {
    create as createSiteDb,
    getLeads,
    getSites as getSiteFromDb,
    getWithSiteId,
    update as updateSiteDb
} from "./data/sites.js";
import {
    loadSitaData
} from "./siteData.js";
import {
    dateAge,
    formatDate
} from "./utils.js";
import {
    firebaseAuth,
    functions
} from "@/modules/firebase.js";

/**
 * Creates a site in the database. If no subdomain provided, it will automatically generate one for you
 *
 * @param {string} siteDataId
 * @returns {string} Site Id
 */
const createSite = async (siteDataId) => {
    const uId = firebaseAuth ? .currentUser ? .uid;
    if (isUndefined(uId)) throw new Error("uId is required to create a site");

    const {
        site,
        siteId
    } = await createSiteDb(uId, siteDataId);

    return {
        site,
        siteId
    };
};

/**
 * Publishes the site via Firebase functions
 *
 * @param {string} siteId The site id for this site
 * @return {Object} Object with url and screenshot
 */
const publishSite = async (siteId) => {
    const publish = httpsCallable(functions, "publish");
    const response = await publish({
        siteId
    });

    const success = get(response, "data.success");
    const data = get(response, "data.data");
    const error = get(response, "data.error", "Failed to publish site");

    if (success === true) return data;
    else throw Error(error);
};

/**
 * Unpublishes the site via Firebase functions
 *
 * @param {string} siteId The site id for this site
 * @return {Object} Object with url and screenshot
 */
const unpublishSite = async (siteId) => {
    const unpublish = httpsCallable(functions, "unpublish");
    const response = await unpublish({
        siteId
    });

    const success = get(response, "data.success");
    const data = get(response, "data.data");
    const error = get(response, "data.error", "Failed to unpublish site");

    if (success === true) return data;
    else throw Error(error);
};

const loadSite = async (siteId, loadSiteData = false) => {
    try {
        const site = await getWithSiteId(siteId);

        let siteData = null;

        if (site && loadSiteData) {
            const content = await loadSitaData(site ? .siteDataId);
            siteData = content.siteData;
            siteData.siteDataId = site.siteDataId;
        }

        return {
            site,
            siteData
        };
    } catch (error) {
        console.error(error);
    }
};

/**
 * Saves a site in the database
 *
 * @param {string} siteId
 * @returns {string} Site Id
 */
const saveSite = async (siteId, data) => {
    try {
        return await updateSiteDb(siteId, data)
    } catch (error) {
        console.error(error);
    }
};

const getSites = async () => {
    const uid = firebaseAuth ? .currentUser ? .uid;

    if (isUndefined(uid)) throw new Error("uId is required to get sites");
    // FIXME: Implement getting of the current suer id, then pass to the DAO method to get sites for this user. With the user pass back to the frontend
    // Implement frontend SiteSelector to display these
    const sites = await getSiteFromDb(uid);
    const sortedSites = sortBy(sites, ["dateCreated"]);
    const descSortedSites = reverse(sortedSites);
    return map(descSortedSites, (site) => {
        return {
            id: site.id,
            name: site ? .name || `Site ${site.id}`,
            //FIXME: Change to use new structure
            subdomain: site ? .subdomain,
            // TODO: update  the default logo for site selectors
            logoUrl: site ? .logoUrl ||
                "https://storage.googleapis.com/mixo-files/public/img/mixo-logo.svg",
            dateCreated: dateAge(site.dateCreated),
        };
    });
};

/**
 * Gets a summary of the latest leads from the database, last submission date and age
 *
 * @param {*} siteId
 *
 * @typedef {Object} LeadSummary
 * @property {Object} lastSubmission - date and age of the last submission
 * @property {Object} leads - the leads and their creation dates
 *
 * @returns {LeadSummary} object cont
 */
const getLeadsSummary = async (siteId) => {
    const leads = await getLeads(siteId, 10);
    const lastSubmission = first(leads);

    return {
        lastSubmission: {
            date: formatDate(get(lastSubmission, "dateCreated")),
            age: dateAge(get(lastSubmission, "dateCreated")),
        },
        leads: map(leads, (lead) => ({
            ...lead,
            date: formatDate(get(lead, "dateCreated")),
        })),
    };
};

const exportLeads = async (siteId) => {
    const generateCsv = httpsCallable(functions, "generateCsv");

    try {
        const response = await generateCsv({
            siteId
        });
        const url = get(response, "data");

        if (isUndefined(url)) throw new Error("Failed to export leads to CSV file");

        return url;
    } catch (error) {
        console.error(error);
    }
};

const checkSubdomain = (subdomain) => {
    // must be at least 3 characters long
    if (!subdomain || subdomain.length < 3)
        throw Error("Subdomain must be at least 3 characters long");

    // no longer than 60 characters in length (64 because it includes subdomain in domain check for custom domains)
    if (subdomain.length > 65) throw Error(`Subdomain must be shorter than 60 characters long (currently ${subdomain.length})`);

    // can not be reserved word (help, www, info, web, main, home, app, )
    // check subdomain only contains alphanumeric and dash
    // eslint-disable-next-line no-useless-escape
    const valueCheck = /^[a-z0-9](?:[a-z0-9\-]{0,61}[a-z0-9])?$/.test(
        subdomain
    );
    if (!valueCheck)
        throw Error(
            "Subdomain can only contain lowercase letters and numbers. It may contain dashes, but may not begin or end with a hyphen"
        );

    return true;
};

const checkCustomDomainValidity = (customDomain) => {
    // must be at least 3 characters long
    if (!customDomain || customDomain.length < 3)
        throw Error("Domain must be at least 3 characters long");

    //no longer than 60 characters in length
    if (customDomain.length > 63)
        throw Error("Domain must be shorter than 60 characters long");

    // can not be reserved word (help, www, info, web, main, home, app, )
    // check subdomain only contains alphanumeric and dash
    // eslint-disable-next-line no-useless-escape
    const valueCheck = /^[a-z0-9](?:[a-z0-9\-.]{0,61}[a-z0-9])?$/.test(
        customDomain
    );
    if (!valueCheck)
        throw Error(
            "Domain can only contain lowercase letters and numbers. It may contain dashes, but may not begin or end with a hyphen"
        );

    return true;
};

const setupDomain = async (domainSettingType, params) => {
    //check siteId is provided
    if (get(params, "siteId") === undefined)
        throw Error("SiteId is required to setup domain");
    //if subdomain check that params has siteId and subdomain
    if (
        domainSettingType === "Subdomain" &&
        get(params, "subdomain") === undefined
    )
        throw Error("Subdomain must be provided to setup domain");
    //if custom domain check that params has siteId customDomain
    if (
        domainSettingType === "CustomDomain" &&
        get(params, "customDomain") === undefined
    )
        throw Error("Site must be provided to setup domain");

    const setupDomainFunction = httpsCallable(functions, "setupDomain");
    const response = await setupDomainFunction(params);
    const success = get(response, "data.success");
    const data = get(response, "data.data");
    const error = get(response, "data.error");
    if (!isUndefined(error)) throw Error(error);
    return {
        success,
        data
    };
};

const setupDomainCustomDomain = async (siteId, subdomain, domain) => {
    const customDomain = `${subdomain}.${domain}`
    checkCustomDomainValidity(customDomain);

    return setupDomain("CustomDomain", {
        siteId,
        customDomain, // eg www.google.com
        customDomainSettings: {
            subdomain, // eg www
            domain // eg google.com
        }
    });
};

const setupDomainSubdomain = async (siteId, subdomain) => {
    checkSubdomain(subdomain);
    return setupDomain("Subdomain", {
        siteId,
        subdomain
    });
};

const setupDomainSubfolder = async (siteId, siteName) => {
    return setupDomain("Subfolder", {
        siteId,
        siteName
    });
};

const getCustomDomainStatus = async (siteId) => {
    const checkCustomDomain = httpsCallable(functions, "checkCustomDomain");
    const response = await checkCustomDomain({
        siteId
    });

    const success = get(response, "data.success");
    const data = get(response, "data.data");
    const error = get(response, "data.error", "Failed to publish site");

    if (success === true) return data;
    else throw Error(error);
};

/**
 * Duplicates a site via Firebase functions
 *
 * @param {string} siteId The site id for this site
 * @return {Object} Object with url and screenshot
 */
const duplicateSite = async (siteId) => {
    const duplicateSite = httpsCallable(functions, "duplicateSite");

    const response = await duplicateSite({
        siteId
    });

    const success = get(response, "data.success");
    const data = get(response, "data.data");
    const error = get(response, "data.error", "Failed to duplicate site");

    if (success === true) {
        return data;
    } else {
        throw Error(error);
    }
};


/**
 * Delete a site via Firebase functions
 *
 * @param {string} siteId The site id for this site
 * @return {Object} Object with url and screenshot
 */
const deleteSite = async (siteId) => {
    const archiveSite = httpsCallable(functions, "archiveSite");

    const response = await archiveSite({
        siteId
    });

    const success = get(response, "data.success");
    const data = get(response, "data.data");
    const error = get(response, "data.error", "Failed to delete site");

    if (success === true) {
        return data;
    } else {
        throw Error(error);
    }
};

export {
    createSite,
    deleteSite,
    duplicateSite,
    loadSite,
    saveSite,
    setupDomainCustomDomain,
    getLeadsSummary,
    publishSite,
    exportLeads,
    getSites,
    setupDomainSubdomain,
    setupDomainSubfolder,
    getCustomDomainStatus,
    unpublishSite,
};