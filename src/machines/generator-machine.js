import {
    assign,
    createMachine
} from 'xstate'
import {
    includes,
    set,
    pull,
    first,
    forEach
} from 'lodash-es'
import {
    helperActions
} from '@/utils/machine-helpers'
import {
    findAndReplaceSiteData
} from "@/lib/siteData";
import {
    generateIdea,
    claimIdea,
    getIdeaDescription
} from "@/lib/generate";
import {
    getImages
} from "@/lib/media";
import {
    logger
} from "@/utils";
import {
    SSR
} from "~/utils/constants.js";
import {
    setCrispValue
} from "@/lib/crisp";
import {
    loadSite
} from '@/lib/sites.js'
import {
    loadIdea
} from '@/lib/ideas.js'

const initialState = {
    errors: [],
    generatingAnimationComplete: false,
    idea: null,
    ideaDescription: '',
}

const generateIdeaSuccessActions = [
    'assignIdea',
    'removeBranding',
    (_, {
        idea
    }) => setCrispValue("ideaId", idea ? .ideaId),
    'redirectToIdeaRoute'
]

export default createMachine({
    id: 'generator',

    predictableActionArguments: true,

    initial: 'setup',

    context: {
        ...initialState,
    },

    states: {
        setup: {
            always: [{
                    target: 'loadingSite',
                    cond: 'hasSiteId'
                },
                {
                    target: 'loadingIdea',
                    cond: 'hasIdeaId'
                },
                {
                    target: 'ideation'
                }
            ],
        },
        ideation: {
            id: 'ideation',
            initial: 'idle',
            entry: 'resetState',
            states: {
                generatingIdea: {
                    id: 'generatingIdea',
                    invoke: {
                        src: 'generateIdeaDescription'
                    },
                    on: {
                        GENERATE_IDEA_DESCRIPTION_FAILED: {
                            target: 'idle',
                            actions: ['assignErrors', 'trackErrors']
                        },
                        GENERATE_IDEA_DESCRIPTION_SUCCESS: {
                            target: 'idle',
                            actions: [
                                'assignIdeaDescription',
                            ]
                        },
                    }
                },
                idle: {
                    on: {
                        GENERATE_IDEA_DESCRIPTION: {
                            target: '#generatingIdea',
                            actions: 'resetErrors'
                        },
                        GENERATE_IDEA: {
                            target: '#generating',
                            actions: 'resetErrors'
                        },
                    },
                }
            },
            on: {
                UPDATE_IDEA_DESCRIPTION: {
                    actions: 'assignIdeaDescription'
                }
            }
        },
        generating: {
            id: 'generating',
            initial: 'loading',
            invoke: {
                src: "generateIdea"
            },
            states: {
                waitingForAnimation: {
                    on: {
                        GENERATING_ANIMATION_COMPLETE: {
                            target: '#redirecting',
                            actions: 'assignGeneratingAnimationComplete'
                        }
                    }
                },
                loading: {
                    on: {
                        GENERATING_ANIMATION_COMPLETE: {
                            actions: 'assignGeneratingAnimationComplete'
                        },
                        GENERATE_IDEA_FAILED: {
                            target: '#ideation',
                            actions: ['assignGeneratingAnimationComplete', 'assignErrors', 'trackErrors']
                        },
                        GENERATE_IDEA_SUCCESS: [{
                                // wait for generating animations to finish
                                cond: 'isGeneratingAnimationComplete',
                                target: '#redirecting',
                                actions: generateIdeaSuccessActions
                            },
                            {
                                target: 'waitingForAnimation',
                                actions: generateIdeaSuccessActions
                            },
                        ]
                    }
                }
            },
        },
        loadingIdea: {
            id: 'loadingIdea',
            invoke: {
                src: "loadIdea",
                onError: {
                    target: 'error',
                    actions: ['assignErrors', 'trackErrors']
                }
            },
            tags: 'loading',
            on: {
                LOAD_IDEA_FAILED: {
                    target: '#error',
                    actions: ['assignErrors', 'trackErrors']
                },
                LOAD_IDEA_SUCCESS: {
                    target: '#generated',
                    actions: generateIdeaSuccessActions
                },
                LOAD_IDEA_CLAIMED: {
                    target: '#redirecting',
                    actions: [{
                            type: "showToast",
                            message: "Idea already claimed.",
                            toastType: "error",
                            toastOptions: {
                                duration: 5000,
                                dismissible: true,
                            },
                        },
                        'redirectToHomeRoute'
                    ]
                },
            }
        },
        generated: {
            id: 'generated',
            initial: 'loading',
            states: {
                loading: {
                    on: {
                        PREVIEW_FRAME_LOADED: {
                            actions: ['assignPreviewFrame', 'updatePreviewFrame'],
                            target: 'idle'
                        },
                    }
                },
                idle: {
                    on: {
                        CLAIM: '#claiming',
                        REGENERATE: {
                            target: '#ideation',
                        },
                        UPDATE_SITE_NAME: {
                            target: '#updateSiteName',
                        },
                        RESELECT_IMAGES: {
                            target: '#reselectingImages',
                        },
                    },
                },
                reselectingImages: {
                    id: 'reselectingImages',
                    entry: [{
                            type: "assignReselectingImages",
                            value: true,
                        },
                        'updatePreviewFrame'
                    ],
                    invoke: {
                        src: "reselectImages"
                    },
                    on: {
                        RESELECT_IMAGES_SUCCESS: {
                            actions: [
                                'assignIdea',
                                'assignImageCache',
                                {
                                    type: "assignReselectingImages",
                                    value: false,
                                },
                                'updatePreviewFrame'
                            ],
                            target: 'idle',
                        },
                        RESELECT_IMAGES_FAILED: {
                            actions: [
                                'assignErrors',
                                'trackErrors',
                                {
                                    type: "assignReselectingImages",
                                    value: false,
                                }
                            ],
                            target: 'idle',
                        }
                    },
                },
                updateSiteName: {
                    id: 'updateSiteName',
                    invoke: {
                        src: "updateSiteName"
                    },
                    on: {
                        RENAME_SITE_SUCCESS: {
                            actions: ['assignIdea', 'updatePreviewFrame'],
                            target: 'idle',
                        },
                    },
                },
            }
        },
        claiming: {
            id: 'claiming',
            entry: 'resetErrors',
            invoke: {
                src: "claiming"
            },
            on: {
                CLAIMING_SUCCESS: {
                    target: '#redirecting',
                    actions: [
                        'assignSiteId',
                        (_, {
                            siteId
                        }) => setCrispValue("siteId", siteId),
                        'redirectToSiteRoute',
                    ]
                },
                CLAIMING_FAILED: {
                    target: '#generated',
                    actions: ['assignErrors', 'trackErrors']
                }
            }
        },
        loadingSite: {
            id: 'loadingSite',
            tags: 'loading',
            invoke: {
                src: "loadSite"
            },
            on: {
                LOAD_SITE_FAILED: {
                    target: '#error',
                    actions: ['assignErrors', 'trackErrors']
                },
                LOAD_SITE_SUCCESS: {
                    target: '#claimed',
                    actions: [
                        'assignSite',
                        (_, {
                            siteId
                        }) => setCrispValue("siteId", siteId)
                    ]
                },
            }
        },
        error: {
            id: 'error',
            on: {
                RETRY: 'setup'
            }
        },
        claimed: {
            id: 'claimed',
            type: 'final'
        },
        redirecting: {
            id: 'redirecting',
            tags: 'loading',
            type: 'final'
        }
    },
}, {
    actions: {
        ...helperActions,
        assignGeneratingAnimationComplete: assign({
            generatingAnimationComplete: (_, {
                generatingAnimationComplete = false
            }) => generatingAnimationComplete
        }),
        assignIdea: assign({
            idea: (_, {
                idea
            }) => idea
        }),
        assignIdeaDescription: assign({
            ideaDescription: (_, {
                ideaDescription
            }) => ideaDescription
        }),
        assignPreviewFrame: assign((_, {
            previewFrame
        }) => ({
            previewFrame
        })),
        assignReselectingImages: assign({
            reselectingImages: (ctx, ev, {
                action = false
            }) => action ? .value
        }),
        assignSite: assign((_, {
            site
        }) => ({
            site
        })),
        assignSiteId: assign({
            siteId: (_, {
                siteId
            }) => siteId
        }),
        assignImageCache: assign({
            imageCache: (_, {
                imageCache
            }) => imageCache
        }),
        removeBranding: assign({
            idea: (_, {
                idea
            }) => {
                return set(idea, 'siteData.config.removeBranding', true)
            }
        }),
        resetState: assign({
            ...initialState,
        }),
    },
    services: {
        claiming: ({
            idea
        }, {
            type
        }) => async (send) => {
            // first thing we should do is save the state of the idea (to ensure changes made persist persist)


            const response = await claimIdea(idea ? .ideaId, idea ? .siteData).catch(error => {
                return send({
                    type: 'CLAIMING_FAILED',
                    error,
                    errorMessage: 'Sorry saving the idea failed. Please try again or contact support with Idea ID "' + idea ? .ideaId + '" to save this idea to your account.',
                    errorEventType: type
                })
            });

            if (!response ? .siteId) {
                return send({
                    type: 'CLAIMING_FAILED',
                    error: 'No Data Returned',
                    errorEventType: type
                })
            }

            send({
                type: 'CLAIMING_SUCCESS',
                siteId: response ? .siteId
            })
        },
        generateIdea: ({
            ideaDescription
        }, {
            type
        }) => async (send) => {
            let errorMessage = 'Sorry the AI failed to generate a site. Please review details below before trying again.'
            let error = null;

            const idea = await generateIdea(ideaDescription)
                .catch(err => {
                    error = err;
                    errorMessage = err ? .message;

                    if (includes(err ? .message, "App Check")) {
                        errorMessage = 'Your browser has blocked our connection to the AI service. Please disable any VPNs, script blockers and firewalls before retrying.'
                    }

                    if (err ? .code === "functions/deadline-exceeded") {
                        errorMessage = 'The AI service is experiencing too much traffic or is currently down. Please try again in a few minutes or come back later.'
                    }

                    if (err ? .code === "functions/internal") {
                        errorMessage = 'It looks like the connection to the AI service was blocked or there was a problem connecting to our service. Please disable any VPNs, script blockers and firewalls before retrying. Contact support if the problem persists.'
                    }
                });

            if (!idea) {
                return send({
                    type: 'GENERATE_IDEA_FAILED',
                    error,
                    errorMessage,
                    errorEventType: type
                })
            }

            logger.log("ideaSite received:", idea);

            send({
                type: 'GENERATE_IDEA_SUCCESS',
                idea
            })
        },
        generateIdeaDescription: (_, {
            type
        }) => async (send) => {
            const ideaDescription = await getIdeaDescription()

            if (!ideaDescription) {
                return send({
                    type: 'GENERATE_IDEA_DESCRIPTION_FAILED',
                    errorMessage: "Couldn't generate idea. Please try again.",
                    errorEventType: type
                })
            }

            send({
                type: 'GENERATE_IDEA_DESCRIPTION_SUCCESS',
                ideaDescription
            })
        },
        loadIdea: ({
            ideaId
        }, {
            type
        }) => async (send) => {
            try {
                const idea = await loadIdea(ideaId)

                if (!idea) {
                    throw Error('No Data Returned')
                }

                if (idea ? .isClaimed) {
                    return send({
                        type: 'LOAD_IDEA_CLAIMED',
                    })
                }

                send({
                    type: 'LOAD_IDEA_SUCCESS',
                    idea
                })

            } catch (error) {
                let errorMessage = 'Sorry, the AI preview you are trying to access does not exist';

                if (includes(error, "App Check")) {
                    errorMessage = 'Your browser has blocked our connection to the AI service. Please disable any VPNs, script blockers and firewalls before retrying.'
                }

                send({
                    type: 'LOAD_IDEA_FAILED',
                    error,
                    errorMessage,
                    errorEventType: type
                })
            }
        },
        loadSite: ({
            siteId
        }, {
            type
        }) => async (send) => {
            try {
                const {
                    site
                } = await loadSite(siteId, false)

                if (!site) {
                    return send({
                        type: 'LOAD_SITE_FAILED',
                        errorMessage: 'The site you are trying to access does not exist or you do not have the required permissions',
                        error: 'No Data Returned',
                        errorEventType: type
                    })
                }

                send({
                    type: 'LOAD_SITE_SUCCESS',
                    site
                })
            } catch (error) {
                let errorMessage = error || 'Sorry, the site failed to load. Please review details below before trying again.';

                if (includes(error, "App Check")) {
                    errorMessage = 'Your browser has blocked our connection to the AI service. Please disable any VPNs, script blockers and firewalls before retrying.'
                }

                send({
                    type: 'LOAD_SITE_FAILED',
                    error,
                    errorMessage,
                    errorEventType: type
                })
            }
        },
        reselectImages: ({
            idea,
            imageCache,
            tag
        }, {
            type
        }) => async (send) => {
            try {
                const searchTerm = tag || first(idea ? .tags) || "business"
                const imageResponse = await getImages(searchTerm, imageCache);
                const images = imageResponse ? .images;

                const ideaEdits = { ...idea
                }
                set(ideaEdits, 'id', Math.random()) // this is used for triggering refreshes
                set(ideaEdits, "siteData.pages.index.sections.hero.heroMedia.image.src", first(images))
                pull(images, first(images)) // we remove image to avoid duplicates
                const features = ideaEdits ? .siteData ? .pages ? .index ? .sections ? .features ? .features;
                // we loop through features and set and remove the first image from the current imageSet
                forEach(features, feature => {
                    set(feature, "featureMedia.image.src", first(images))
                    pull(images, first(images))
                })

                send({
                    type: 'RESELECT_IMAGES_SUCCESS',
                    idea: ideaEdits,
                    imageCache: imageResponse.imageCache
                })
            } catch (error) {
                // RESELECT_IMAGES_FAILED event when it fails or you don't get the results you're expecting
                send({
                    type: 'RESELECT_IMAGES_FAILED',
                    error,
                    errorMessage: "The AI service could not find any suitable images. Once you save this site and proceed to the editor, you can manually search and select images instead.",
                    errorEventType: type
                })
            }
        },
        updateSiteName: ({
            idea
        }, {
            siteName
        }) => async (send) => {
            const ideaEdit = { ...idea
            }
            set(ideaEdit, 'id', Math.random()) // this is used for triggering refreshes
            set(ideaEdit, "name", siteName)

            // lets update siteData
            const siteData = findAndReplaceSiteData(idea ? .siteData, idea ? .name, siteName)
            set(ideaEdit, "siteData", siteData)

            send({
                type: 'RENAME_SITE_SUCCESS',
                idea: ideaEdit
            })
        },
    },
    guards: {
        isGeneratingAnimationComplete: ({
            generatingAnimationComplete
        }) => generatingAnimationComplete === true,
        hasIdeaId: ({
            ideaId
        }) => !!ideaId,
        hasSiteId: ({
            siteId
        }) => !!siteId,
    },
})