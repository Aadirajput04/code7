import {
    loadContent
} from "./data/sites.js";
import {
    isEmpty,
    forEach,
    includes,
    replace
} from "lodash-es";
import {
    logger
} from "@/utils/index.js";

const sortSectionOrder = (sections = {}) => {
    if (isEmpty(sections)) return sections;

    const sortable = []
    const sortedSections = {};

    // Create an array of section objects
    for (const section in sections) {
        sortable.push({
            sectionName: section,
            ...sections[section],
        })
    }

    // Sort the array by the sortOrder property
    sortable.sort((a, b) => {
        return a.sortOrder - b.sortOrder
    })

    // Convert the sorted array back to an object
    sortable.forEach((section) => {
        sortedSections[section.sectionName] = section
    })

    return sortedSections
}


/**
 * This function gets the siteData and performs any sortOrder sorting before returning
 *
 * @param {*} siteDataId
 * @returns
 */
const loadSitaData = async (siteDataId) => {
    const siteDataResponse = await loadContent(siteDataId)
    const pages = {};

    // we want to return all siteData sections in the order intended by sortOrder
    forEach(siteDataResponse ? .siteData ? .pages, (page, pageName) => {
        pages[pageName] = {
            ...page,
            sections: sortSectionOrder(page.sections),
        };
    });

    const newSiteData = {
        ...siteDataResponse.siteData,
        pages: pages,
    };

    return {
        ...siteDataResponse,
        siteData: newSiteData
    }
}
const findAndReplaceSiteData = (data = {}, findString, replaceString) => {
    for (let property in data) {
        if (typeof data[property] === "object" && data[property] !== null) {
            findAndReplaceSiteData(data[property], findString, replaceString);
        } else if (typeof data[property] === "string") {
            const whiteList = [
                "siteTitle", "siteName", "siteDescription", "review", "subtitle",
                "title", "testimonial", "content"
            ]

            if (includes(whiteList, property)) {
                const value = String(data[property]);

                // we only want to run updates for handlebar items
                if (includes(value, findString)) {
                    logger.log(`${property} includes ${value}`)
                    data[property] = replace(value, findString, replaceString);
                }
            }
        }
    }
    return data;
};

export {
    loadSitaData,
    findAndReplaceSiteData
}