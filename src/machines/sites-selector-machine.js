import {
    assign,
    createMachine
} from 'xstate'
import {
    find
} from 'lodash-es'
import {
    helperActions
} from '@/utils/machine-helpers'
import {
    deleteSite,
    duplicateSite,
    getSites
} from '@/lib/sites'

const initialState = {
    errorMessage: '',
    sites: {},
}

export default createMachine({
    id: 'sitesSelector',

    initial: 'loading',

    context: {
        ...initialState,
    },

    states: {
        loading: {
            id: 'loading',
            tags: 'loading',
            invoke: {
                src: 'loadSites',
            },
            on: {
                LOAD_SITES_SUCCESS: {
                    target: '#ready',
                    actions: ['assignSites', 'assignCurrentSite'],
                },
                LOAD_SITES_ERROR: {
                    target: '#error',
                    actions: 'assignErrors',
                },
            },
        },
        ready: {
            id: 'ready',
            on: {
                DUPLICATE_SITE: 'duplicatingSite',
                DELETE_SITE: 'deletingSite'
            }
        },
        deletingSite: {
            tags: 'loading',
            invoke: {
                src: 'deleteSite'
            },
            on: {
                DELETE_SITE_SUCCESS: {
                    target: 'ready',
                    actions: [{
                            type: "showToast",
                            message: "Site Deleted",
                            toastType: "success",
                            toastOptions: {
                                duration: 7000,
                                dismissible: true,
                            },
                        },
                        'redirectToIndexRoute'
                    ]
                },
                DELETE_SITE_ERROR: {
                    target: 'error',
                    actions: [
                        "assignErrors",
                        "trackErrors",
                    ],
                }
            }
        },
        duplicatingSite: {
            tags: 'loading',
            invoke: {
                src: 'duplicateSite'
            },
            on: {
                DUPLICATE_SITE_SUCCESS: {
                    target: 'ready',
                    actions: [{
                            type: "showToast",
                            message: "Site Duplicated (To rename go to the dashboard)",
                            toastType: "success",
                            toastOptions: {
                                duration: 7000,
                                dismissible: true,
                            },
                        },
                        'redirectToSiteRoute'
                    ]
                },
                DUPLICATE_SITE_ERROR: {
                    target: 'error',
                    actions: [
                        "assignErrors",
                        "trackErrors",
                    ],
                }
            }
        },
        error: {
            id: 'error',
            on: {
                RESET: 'loading'
            }
        },
    },
}, {
    actions: {
        ...helperActions,
        assignSites: assign((_, {
            sites
        }) => ({
            sites
        })),
        assignCurrentSite: assign((_, {
            currentSite
        }) => ({
            currentSite
        })),
    },
    services: {
        deleteSite: (_, {
            siteId
        }) => async (send) => {
            try {
                const result = await deleteSite(siteId)

                if (result ? .site ? .isRemoved === true) {
                    send({
                        type: 'DELETE_SITE_SUCCESS',
                        siteId: result ? .siteId,
                    })
                } else {
                    throw Error('Site not deleted: ' + siteId)
                }

            } catch (error) {
                send({
                    type: 'DELETE_SITE_ERROR',
                    error
                })
                console.error(error)
            }
        },
        duplicateSite: (_, {
            siteId
        }) => async (send) => {
            try {
                const newSiteId = await duplicateSite(siteId)

                if (newSiteId ? .siteId) {
                    send({
                        type: 'DUPLICATE_SITE_SUCCESS',
                        siteId: newSiteId ? .siteId,
                    })
                } else {
                    throw Error('No site id returned')
                }

            } catch (error) {
                send({
                    type: 'DUPLICATE_SITE_ERROR',
                    error
                })
                console.error(error)
            }
        },
        loadSites: ({
            currentSiteId
        }) => async (send) => {
            try {
                const sites = await getSites()
                const currentSite = find(sites, {
                    id: currentSiteId
                })

                send({
                    type: 'LOAD_SITES_SUCCESS',
                    sites,
                    currentSite,
                })
            } catch (error) {
                send({
                    type: 'LOAD_SITES_ERROR',
                    error
                })
                console.error(error)
            }
        },
    },
}, )