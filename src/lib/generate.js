import {
    httpsCallable
} from "firebase/functions";
import {
    get,
    sample
} from "lodash-es";
import {
    functions
} from "@/modules/firebase.js";

const generateIdea = async (description) => {
    const generate = httpsCallable(functions, "generate");
    const response = await generate({
        description
    });

    const success = get(response, "data.success");
    const data = get(response, "data.data");
    const error = get(response, "data.error", "Failed to generate idea");

    if (success === true) {
        return {
            ideaId: data.ideaId,
            name: data.name,
            description: data.description,
            tags: data.tags,
            themes: data.themes,
            siteTitle: data.site.siteTitle,
            logoUrl: data.logoUrl,
            url: data.site.url,
            siteDataId: data.siteDataId,
            siteData: data.siteData
        };
    } else throw Error(error);
};


/**
 *
 * @param {*} ideaId
 * @param {*} [siteData={}]
 * @returns
 */
const claimIdea = async (ideaId, siteData = {}) => {
    const claim = httpsCallable(functions, "claim");
    const response = await claim({
        ideaId,
        siteData
    });

    const success = get(response, "data.success");
    const data = get(response, "data.data");
    const error = get(response, "data.error", "Failed to claim idea");

    if (success === true) {
        return {
            siteId: data.siteId
        };
    } else throw Error(error);
};

const getIdeaDescription = () => {
    const ideas = [
        `A consulting service that provides analysis on business performance`,
        `A service that connects patients with doctors to help them with medical needs`,
        `${sample(["Dog walking service", "Cooking service", "Political news"])} for those who are short on time`,
        `${sample(["Fashion website", "Food and dining website", "Plant and garden website"])} that sends you a monthly newsletter on the latest trends`,
        `Garden design service that helps you design your dream garden`,
        `${sample(["Interior home decorator", "Garden and plant recommendations", "Photography services"])} that you can book online`,
        `Tree and plants trimming service that maintain your garden for you`,
        `A ${sample(["travel website","dating app","skiing website","travel agent"])} for unique adventures`,
        `Help people make the right choice`,
        `Online counselling website for ${sample(["couples and relationships","families","children"])}`,
        `${sample(["BitCoin and Cryptocurrencies", "Film", "Music", "Business", "Athletics"])} newsletter that explains the latest trends`,
        `Construction services for architects, builders and workers`,
        `Medical marketplace that helps connect people with doctors`,
        `AI platform that helps you deal with stress and frustration`,
        `Online marketplace for selling ${sample(["rare and vintage books", "photography", "cartoons", "cosmetic and beauty products"])}`,
        `Online travel agent that helps you book the best experiences in ${sample(["Italy", "Spain", "Germany"])}`,
        `Personalized ${sample(["meal plans and recipes", "home exterior tips", "dessert recipes"])} to help members reach their health & fitness goals`,
    ];

    return sample(ideas)
}


export {
    generateIdea,
    claimIdea,
    getIdeaDescription
};