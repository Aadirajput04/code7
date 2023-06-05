import {
    arrowDown,
    arrowUp,
    check,
    circle,
    close,
    fileDoc,
    spinner,
    star,
    trash,
} from "@formkit/icons"
import {
    generateClasses
} from '@formkit/themes'
import {
    createProPlugin,
    inputs
} from '@formkit/pro'
import theme from './theme.js'
import MediaInput from '@/components/MediaInput/MediaInput.vue'
import {
    checkNakedUrl,
    checkValidDomain
} from "./rules";

import {
    createInput
} from '@formkit/vue'

const pro = createProPlugin('fk-7dc794d0af2', inputs)

const config = {
    config: {
        // pass our theme object to generateClasses
        classes: generateClasses(theme)
    },
    icons: {
        // include supporting icons from @formkit/icons
        arrowDown,
        arrowUp,
        close,
        checkboxDecorator: check,
        fileItem: fileDoc,
        fileRemove: close,
        noFiles: fileDoc,
        radioDecorator: circle,
        spinner,
        star,
        trash,
    },
    rules: {
        checkNakedUrl,
        checkValidDomain
    },
    plugins: [pro],
    inputs: {
        mediaInput: createInput(MediaInput, {
            props: ['label', 'value', 'enableVideo', 'enableUnsplash', 'enableUploader', 'returnImagePathAsString'],
        }),
    },
}

export default config