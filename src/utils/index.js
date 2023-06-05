import * as Sentry from "@sentry/vue";
import {
    PRODUCTION,
    SSR
} from '~/utils/constants'
const {
    VITE_APP_ENV
} =
import.meta.env
// Setup our loggers...
// If we're in production send errors to error service...
const logger = {}

if (!SSR) {
    logger.error = (err, context) => {
        if (VITE_APP_ENV === 'production') {
            Sentry ? .setContext(context);
            Sentry ? .captureException(err);
        } else {
            console.group('👨‍💻:', err ? .label || 'Error')
            console.info(context);

            if (err) {
                console.error(err)
            }
            console.groupEnd()
        }
    }

    logger.log = VITE_APP_ENV === 'production' ? () => {} : window ? .console ? .log
    logger.info = window ? .console ? .info
    logger.warn = window ? .console ? .warn
}


export {
    logger
}