import {
    defaultConfig,
    plugin
} from '@formkit/vue'
import config from '@/utils/formkit/config.js'

export const install = ({
    app
}) => {
    app.use(plugin, defaultConfig(config))
}