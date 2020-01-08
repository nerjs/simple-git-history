const path = require('path')

const getPathName = (pathname, countSection) => {
    const pathArr = pathname.split(path.sep).reverse()
    return pathArr
        .filter((_, i) => i < countSection)
        .reverse()
        .join(path.sep)
}

const getName = (repos, pathname, pkg, countSection = 1) => {
    const nameForPath = getPathName(pathname, countSection)
    let name = `.../${nameForPath}`

    if (pkg && pkg.name) {
        name = `${name}:(${pkg.name})`
    }

    if (!repos.find(r => r.name === name && r.pathname !== pathname)) return name

    if (countSection >= 5) throw new Error('Unable to give normal repository name')

    return getName(repos, pathname, countSection + 1)
}

module.exports = getName
