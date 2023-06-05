import {
    serverTimestamp as firestoreTimestamp
} from 'firebase/firestore'
import {
    serverTimestamp as rtdbTimestamp
} from 'firebase/database'
import hexRgb from "hex-rgb";

/**
 * Returns a placeholder value for auto-populating the current timestamp (time since the Unix epoch, in milliseconds) as determined by the Firebase servers.
 * https://firebase.google.com/docs/reference/js/database#servertimestamp
 *
 * @param {string} dbType - 'firestore' or 'rtdb'
 * @returns {object}
 */
const getServerTimestamp = (dbType = 'firestore') => dbType === 'rtdb' ? rtdbTimestamp() : firestoreTimestamp()

/**
 * Formats the date to human readable format
 *
 * @param {*} isoDate
 * @returns
 */
const formatDate = isoDate => (!(isoDate === undefined) ?
    new Date(isoDate).toLocaleDateString(
        'en-gb', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        },
    ) :
    undefined)

/**
 * Returns a string with the age of the date you provided
 *
 * @param {string} dateISOString String of the date to compare
 * @returns {string} the day / hours ago of the date
 */
const dateAge = (dateISOString) => {
    const ONE_DAY = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
    const ONE_HOUR = 60 * 60 * 1000 // minutes*seconds*milliseconds

    // prepare dates in date object
    const pastDate = new Date(dateISOString)
    const now = new Date()

    // check days ago
    const daysAgo = Math.round(Math.abs((pastDate - now) / ONE_DAY))
    if (daysAgo > 0)
        return (daysAgo === 1) ? `${daysAgo} day ago` : `${daysAgo} days ago`

    // if 0 days ago, check for hours ago
    const hoursAgo = Math.round(Math.abs((pastDate - now) / ONE_HOUR))
    if (hoursAgo > 0)
        return (hoursAgo === 1) ? `${hoursAgo} hour ago` : `${hoursAgo} hours ago`

    // else return moments ago
    return 'moments ago'
}


const hasDayPassed = (dateISOString) => {
    const ONE_DAY = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds

    // prepare dates in date object
    const pastDate = new Date(dateISOString)
    const now = new Date()

    // check days ago
    const daysAgo = Math.round(Math.abs((pastDate - now) / ONE_DAY))
    return (daysAgo > 0)
}

const setCSSColorVariables = (primaryColor, secondaryColor) => {
    if (!
        import.meta.env.SSR && window ? .document) {
        // Targets to update
        const appRoot = document ? .querySelector(":root");
        const previewer = document.querySelector("#previewer");
        const previewerRoot = previewer ? .contentDocument ? .querySelector(":root")
        const targets = [appRoot, previewerRoot]

        // Convert hex to rgb
        const primaryRgb = hexRgb(
            primaryColor || "#000000"
        );
        const secondaryRgb = hexRgb(
            secondaryColor || "#000000"
        );

        targets.forEach(el => {
            // Set the value of variable
            el ? .style ? .setProperty(
                "--color-primary",
                `${primaryRgb.red} ${primaryRgb.green} ${primaryRgb.blue}`
            );
            el ? .style ? .setProperty(
                "--color-secondary",
                `${secondaryRgb.red} ${secondaryRgb.green} ${secondaryRgb.blue}`
            );
            // Set the video player colour
            el ? .style ? .setProperty(
                "--plyr-color-main",
                primaryColor
            );
        });
    }
}

export {
    getServerTimestamp,
    formatDate,
    dateAge,
    hasDayPassed,
    setCSSColorVariables
}