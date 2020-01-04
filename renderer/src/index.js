import React from 'react'
import reactDOM from 'react-dom'
let App = null

if (BUILD_TYPE === 'hot') {
    App = require('./hot').default
} else {
    App = require('./app').default
}

const domId = document.getElementById('root')

const render = Comp => {
    reactDOM.render(<Comp />, domId)
}

render(App)
