import {
    ViteSSG
} from 'vite-ssg'
import {
    setupLayouts
} from 'virtual:generated-layouts'
import {
    getCurrentUser
} from 'vuefire'
import {
    sentrySetup,
    errorHandler
} from '@/utils/error-tracking.js'
import App from './App.vue'
import generatedRoutes from '~pages'
import {
    PRODUCTION
} from '~/utils/constants'

import './styles/tailwind.css'
import './styles/main.css'
import '~/styles/base.css'

const routes = setupLayouts(generatedRoutes)

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
    App, {
        routes,
        base: import.meta.env.BASE_URL
    },
    (ctx) => {
        // Setup Sentry Vue Integration
        PRODUCTION && sentrySetup(ctx)

        // Setup errorHandler
        ctx.app.config.errorHandler = errorHandler;

        // install all modules under `modules/`
        Object.values(
            import.meta.globEager('./modules/*.js')).forEach(i => i.install ? .(ctx))

        // Configure router
        ctx ? .router ? .beforeEach(async (to) => {
            // routes with `meta: { requiresAuth: true }` will check for the users, others won't
            if (to ? .meta ? .requiresAuth) {
                const currentUser = await getCurrentUser()

                // if the user is not logged in, redirect to the login page
                if (!currentUser) {
                    return {
                        path: '/login',
                        query: {
                            // we keep the current path in the query so we can redirect to it after login
                            // with `router.push(route.query.redirect || '/')`
                            redirect: to.fullPath,
                        },
                    }
                }
            }
        })
    },
)