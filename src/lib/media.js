import {
    createApi
} from 'unsplash-js'
import {
    get,
    shuffle
} from 'lodash-es'
import {
    httpsCallable
} from 'firebase/functions'
import ky from 'ky'
import {
    functions
} from '@/modules/firebase.js'
import {
    DEVELOPMENT
} from "~/utils/constants.js";

// on your node server

/**
 * Performs a query on unsplash to get photos. Example results look like
 * {
      "results": [
        {
          "user": {
            "username": "ugmonk",
            "name": "Jeff Sheldon",
            "links": {
              "html": "http://unsplash.com/@ugmonk",
            }
          },
          "urls": {
            "full": "https://hd.unsplash.com/photo-1416339306562-f3d12fefd36f",
            "regular": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=92f3e02f63678acc8416d044e189f515",
            "small": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&s=263af33585f9d32af39d165b000845eb",
            "thumb": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=8aae34cf35df31a592f0bef16e6342ef"
          },
        },
        // more photos ...
      ]
    }
 *
 * @param {*} searchTerm
 * @param {*} options
 * @returns
 */
const searchUnsplash = async (searchTerm, options) => {
    if (DEVELOPMENT) {
        console.groupCollapsed('🖼️ Unsplash Called...')
        console.log(searchTerm, options)
        console.groupEnd()
    }

    if (
        import.meta.env.VITE_UNSPLASH_ACCESS_KEY === undefined)
        console.warn("WARNING: VITE_UNSPLASH_ACCESS_KEY environment value not set")

    const unsplash = createApi({
        accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
    })

    try {
        const response = await unsplash.search.getPhotos({
            query: searchTerm,
            page: get(options, 'page', 1),
            perPage: get(options, 'perPage', 10),
            color: get(options, 'color', undefined),
            orientation: get(options, 'orientation', 'landscape'), //landscape, portrait, squarish
        })

        return get(response, 'response.results', [])
    } catch (error) {
        console.error(error)
        return error
    }
}

const trackDownload = async (downloadLocation) => {
    try {
        if (
            import.meta.env.VITE_UNSPLASH_ACCESS_KEY === undefined)
            console.warn("WARNING: VITE_UNSPLASH_ACCESS_KEY environment value not set")

        const unsplash = createApi({
            accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
        })

        console.log(`About to track unsplash download ${downloadLocation}...`)
        unsplash.photos.trackDownload({
            downloadLocation
        });
    } catch (error) {
        console.error(error)
        throw error

    }
}

/**
 * This function allows you to get a signed upload URL to post to and upload files to Google Cloud
 *
 * @param {*} extension
 * @returns {Object} the uploadUrl (to perform upload with), the destinationUrl (the URL where file will end up)
 */
const getSignedUploadUrl = async (extension) => {
    const signUploadUrl = httpsCallable(functions, 'signUploadUrl')

    try {
        const response = await signUploadUrl({
            extension
        })

        const uploadUrl = await get(response, 'data.uploadUrl')
        const destinationUrl = await get(response, 'data.destinationUrl')

        return {
            uploadUrl,
            destinationUrl,
        }
    } catch (error) {
        console.error(error)
    }
}

/**
 * Uploads a file a signed upload URL
 *
 * @param {Object} data
 * @returns {Boolean} whether the upload was successful
 */
const uploadFile = async (signedUrl, fileObj) => {
    // Perform upload to signed URL
    const response = await ky.put(signedUrl, {
        headers: {
            "Content-Type": fileObj.file.type
        },
        body: fileObj.file
    })

    if (response.ok) {
        const url = response.url.split("?")[0];
        console.log(`Uploaded file successfully - ${url}`)
        return {
            url: url
        }
    } else
        throw new Error(response.statusText)
}



/**
 * This helper function is used to simulate a delay when we use the cache to get images
 *
 * @param {*} cache
 * @returns
 */
const simulateDelay = (cache, delay = 1000) => {
    return new Promise((resolve) => {
        // wait 1 seconds to simulate delay
        setTimeout(() => resolve(cache), delay)
    })
}

/**
 * Gets images from search. Returns cache object to be used for subsequent calls
 *
 * @param {*} searchTerm
 * @param {*} imageCache
 * @returns
 */
const getImages = async (searchTerm, imageCache) => {
    // we dont want to call for the set every time (since we only get 5000 calls / hour)
    const unsplashCallResults = await simulateDelay(imageCache) || await searchUnsplash(searchTerm, {
        perPage: "400"
    });
    const source = imageCache ? "cache" : "unsplash"
    const shuffledResults = shuffle(unsplashCallResults);

    return {
        source,
        images: shuffledResults.map(result => result ? .urls ? .regular),
        imageCache: unsplashCallResults,
    }
}

export {
    getSignedUploadUrl,
    searchUnsplash,
    uploadFile,
    trackDownload,
    getImages
}