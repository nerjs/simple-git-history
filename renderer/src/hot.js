import React from 'react'
import App from './app'
import { hot } from 'react-hot-loader'

const HotApp = () => <App />

export default hot(module)(HotApp)
