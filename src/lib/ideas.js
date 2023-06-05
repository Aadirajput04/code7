import {
    get
} from "./data/ideas.js";
import {
    loadSitaData
} from "./siteData.js";
import {
    logger
} from "@/utils/index.js";

const loadIdea = async (ideaId) => {
    const idea = await get(ideaId);
    if (!idea) throw Error(`Could not find ${ideaId}`)

    const siteDataResponse = await loadSitaData(idea.siteDataId)

    return {
        ideaId,
        name: idea ? .name,
        description: idea ? .description,
        tags: idea ? .tags,
        themes: idea ? .themes,
        siteTitle: idea ? .site ? .siteTitle,
        logoUrl: idea ? .logoUrl,
        url: idea ? .site ? .url,
        siteData: siteDataResponse ? .siteData
    };
}

export {
    loadIdea
}