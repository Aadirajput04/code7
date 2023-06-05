import UiLoaderCenter from '^/components/ui/UiLoader/UiLoaderCenter.vue'
import AsyncComponentError from "^/components/misc/AsyncComponentError.vue";

export const asyncComponentDefaults = {
    // A component to use while the async component is loading
    loadingComponent: UiLoaderCenter,
    // Delay before showing the loading component. Default: 200ms.
    delay: 200,

    // A component to use if the load fails
    errorComponent: AsyncComponentError,
    // The error component will be displayed if a timeout is
    // provided and exceeded. Default: Infinity.
    timeout: 5000,
    onError: (error, retry, fail, attempts) => {
        console.log(error, retry, fail, attempts)
        if (error ? .message ? .match(/fetch/) && attempts <= 3) {
            retry();
        } else {
            fail();
        }
    }
}