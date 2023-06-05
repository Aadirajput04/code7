import * as Sentry from "@sentry/vue";
import {
    DEVELOPMENT,
    PRODUCTION
} from "~/utils/constants.js";

const sentrySetup = ({
    app,
    isClient,
    router
}) => {
    if (isClient) {
        Sentry.init({
            app,
            dsn: "https://8db4236e7f44495597276c7df5eb5f06@o4505144668389376.ingest.sentry.io/4505145018679296",
            environment: import.meta.env.VITE_APP_ENV,
            integrations: [
                new Sentry.BrowserTracing({
                    routingInstrumentation: Sentry.vueRouterInstrumentation(router),
                }),
                new Sentry.Replay({
                    blockAllMedia: false,
                    mask: ['input[type="password"]'],
                    maskAllInputs: false,
                    maskAllText: false
                }),
            ],
            trackComponents: true,
            // Performance Monitoring
            tracesSampleRate: PRODUCTION ? 0.1 : 1.0, // Capture 100% of the transactions in dev, reduce in production!
            // Session Replay
            replaysSessionSampleRate: PRODUCTION ? 0.1 : 1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
            replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
        });
    }
}

const errorHandler = (err, vm, info) => {
    // Log properties passed to the component if there are any
    if (vm.$options.propsData) {
        if (DEVELOPMENT) {
            console.log("Props passed to component", vm.$options.propsData);
        } else {
            Sentry ? .captureException(err);
        }
    }

    // Emit component name and also the lifecycle hook the error occurred in if present
    var infoMessage = `Error in component: <${vm.$options.name} />\n`;
    if (info) {
        infoMessage += `Error occurred during lifecycle hook: ${info}\n`;
    }

    if (DEVELOPMENT) {
        console.log(infoMessage);
        console.error(err);
    } else {
        // Set additional error information
        Sentry ? .setContext(infoMessage);

        // Track the native JS error
        Sentry ? .captureException(err);
    }
}

export {
    sentrySetup,
    errorHandler
}