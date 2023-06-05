import {
    VueFire,
    VueFireAuth
} from 'vuefire'
import {
    firebaseApp
} from '@/modules/firebase.js';

export const install = async ({
    app
}) => {
    app.use(VueFire, {
        // imported above but could also just be created here
        firebaseApp,
        modules: [
            VueFireAuth(),
        ],
    })
}