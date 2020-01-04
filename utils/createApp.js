const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

module.exports = (settings = {}) => {
    if (!settings || typeof settings !== 'object') throw new Error('Settings must be an object')
    const app = express()

    if (settings.logger !== false)
        // dev, tiny, common
        app.use(
            morgan(
                typeof settings.logger === 'string' || typeof settings.logger === 'function'
                    ? settings.logger
                    : 'dev',
            ),
        )

    // VIEWS SETTINGS
    if (settings.views) {
        app.set('views', settings.views)
        app.set('view engine', 'ejs')
    }

    // BODY PARSING SETTINGS
    if (settings.bodyJson !== false) app.use(bodyParser.json())
    if (settings.bodyUrlcoded !== false)
        app.use(
            bodyParser.urlencoded(
                typeof settings.bodyUrlcoded === 'object'
                    ? settings.bodyUrlcoded
                    : { extended: false },
            ),
        )

    // STATIC SETTINGS
    if (settings.static) {
        const staticFiles = Array.isArray(settings.static) ? settings.static : [settings.static]
        staticFiles.forEach(staticFile => {
            app.use(express.static(staticFile))
        })
    }

    return app
}
