const path = require('path')

exports.ROOT_DIR = path.join(__dirname, '..')
exports.BUILD_DIR = path.join(ROOT_DIR, 'renderer', 'build')
exports.STATIC_DIR = path.join(ROOT_DIR, 'renderer', 'static')
exports.TARGET_DIR = path.join(ROOT_DIR, 'app', 'static')
