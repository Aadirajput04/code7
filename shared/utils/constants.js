const DEVELOPMENT =
    import.meta.env.DEV
const PRODUCTION =
    import.meta.env.PROD
const SSR =
    import.meta.env.SSR
const MIXO_DOMAIN =
    import.meta.env.VITE_MIXO_DOMAIN
const APP_URL =
    import.meta.env.VITE_APP_URL
const ADMIN_STORAGE_FLAG = "mixo-admin"

export {
    ADMIN_STORAGE_FLAG,
    APP_URL,
    DEVELOPMENT,
    MIXO_DOMAIN,
    PRODUCTION,
    SSR
}