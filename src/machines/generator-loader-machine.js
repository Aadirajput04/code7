import {
    createMachine
} from 'xstate'
import {
    helperActions
} from '@/utils/machine-helpers'

const initialState = {
    errors: [],
}

export default createMachine({
    id: 'generatorLoader',

    initial: '0',

    context: {
        ...initialState,
    },

    states: {
        0: {
            after: {
                RANDOM_DELAY: {
                    target: '1'
                }
            }
        },
        1: {
            after: {
                RANDOM_DELAY: {
                    target: '2'
                }
            }
        },
        2: {
            after: {
                RANDOM_DELAY: {
                    target: '3'
                }
            }
        },
        3: {
            after: {
                RANDOM_DELAY: {
                    target: '4'
                }
            }
        },
        4: {
            after: {
                RANDOM_DELAY: {
                    target: '5'
                }
            }
        },
        5: {
            after: {
                RANDOM_DELAY: {
                    target: '6'
                }
            }
        },
        6: {
            after: {
                RANDOM_DELAY: {
                    target: '7'
                }
            }
        },
        7: {
            after: {
                RANDOM_DELAY: {
                    target: '8'
                }
            }
        },
        8: {
            after: {
                RANDOM_DELAY: {
                    target: '9'
                }
            }
        },
        9: {
            after: {
                RANDOM_DELAY: {
                    target: '10'
                }
            }
        },
        10: {
            after: {
                RANDOM_DELAY: {
                    target: '11'
                }
            }
        },
        11: {
            after: {
                RANDOM_DELAY: {
                    target: '12'
                }
            }
        },
        12: {
            after: {
                RANDOM_DELAY: {
                    target: '13'
                }
            }
        },
        13: {
            after: {
                RANDOM_DELAY: {
                    target: '14'
                }
            }
        },
        14: {
            type: 'final',
            entry: 'emitComplete'
        },
    },
}, {
    actions: {
        ...helperActions,
    },
    delays: {
        RANDOM_DELAY: () => {
            const minDelay = 950;
            const maxDelay = 3300;
            const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
            return delay
        },
    }
})