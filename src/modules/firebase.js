// Import the functions you need from the SDKs you need
import {
    getApps,
    initializeApp
} from 'firebase/app'
import {
    getDatabase
} from 'firebase/database'
import {
    getFirestore
} from 'firebase/firestore'
import {
    getAnalytics
} from 'firebase/analytics'
import {
    connectFunctionsEmulator,
    getFunctions
} from 'firebase/functions'
import {
    ReCaptchaV3Provider,
    initializeAppCheck
} from 'firebase/app-check'
import * as Sentry from "@sentry/vue";
import {
    getAuth
} from 'firebase/auth'
import {
    ADMIN_STORAGE_FLAG,
    DEVELOPMENT,
    SSR
} from '~/utils/constants.js'
import {
    setCrispValue
} from '@/lib/crisp'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_RTDB_URL,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

const ENABLE_EMULATORS =
    import.meta.env.VITE_EMULATORS === 'true'

// Setup the app...
const apps = getApps()
export const firebaseApp = !apps.length ? initializeApp(firebaseConfig) : apps[0]

// initialize App Check
const setupAppCheck = () => {
    try {
        if (DEVELOPMENT) {
            self.FIREBASE_APPCHECK_DEBUG_TOKEN = true
        }

        initializeAppCheck(firebaseApp, {
            provider: new ReCaptchaV3Provider(
                import.meta.env.VITE_RECAPTCHA_SITE_KEY),

            // Optional argument. If true, the SDK automatically refreshes App Check
            // tokens as needed.
            isTokenAutoRefreshEnabled: true,
        })
    } catch (error) {
        console.log('initializeAppCheck error')
        console.error(error)
    }
}
// Check if the user is online before trying to instantiate AppCheck
if (typeof window !== "undefined") {
    if (window ? .navigator ? .onLine) {
        setupAppCheck()
    }

    window ? .addEventListener('online', setupAppCheck)
}

// Initialize Firebase services
export const firebaseAuth = getAuth(firebaseApp)
export const rtdb = getDatabase()
export const firestore = getFirestore(firebaseApp)
// TODO: move functions region into config
export const functions = getFunctions(firebaseApp, 'us-west2')
if (DEVELOPMENT && ENABLE_EMULATORS) connectFunctionsEmulator(functions, 'localhost', 5333)
export const analytics = (!SSR && !DEVELOPMENT) ? getAnalytics(firebaseApp) : null

export const install = ({
    app
}) => {
    app.provide('firebaseApp', firebaseApp)
    app.provide('firebaseAuth', firebaseAuth)
    if (DEVELOPMENT) {
        console.log('🔥 Firebase Initialized')
    } // eslint-disable-line no-console

    firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
            if (DEVELOPMENT) {
                console.log(`🔥👨‍💻: ${user.displayName} | ${user.email} | ${user.uid}`)
            }

            if (!SSR) {
                Sentry ? .setUser({
                    email: user ? .email,
                    id: user ? .uid,
                    displayName: user ? .displayName
                });
            }

            setCrispValue("userId", user ? .uid);

            // TODO: move this to use a flag on the user when signed up
            if (!SSR) {
                // if user is admin, store a local storage value for them
                const adminEmails = [
                    "adam@mixo.io",
                    "giles@fuzzylogic.ai",
                    "adam@fuzzylogic.ai",
                    "adam@mixvisor.com",
                    "giles@mixvisor.com",
                    "giles@mixo.io",
                    "arbolino@gmail.com",
                ];
                if (adminEmails.includes(user ? .email))
                    window ? .localStorage.setItem(ADMIN_STORAGE_FLAG, true);
            }
        }
    });
}