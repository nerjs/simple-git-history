require('dotenv').config()
const path = require('path')
const createApp = require('./utils/createApp')
const hmr = require('./utils/hmr')

const { DEV_PORT, BUILD_TYPE } = process.env

const app = createApp({
    logger: 'dev',
    static: [path.join(__dirname, 'static'), path.join(__dirname, 'build')],
})

if (BUILD_TYPE === 'hot') hmr(app, path.join(__dirname, 'webpack.config.js'))

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'))
})

app.use((err, req, res, next) => {
    log.error(err)
    res.end('Error!!!')
})

console.info('Start service')
app.listen(Number(DEV_PORT), err => {
    if (err) return console.error(err)
    console.info(`Start server \n\thttp://localhost:${DEV_PORT}`)
})
