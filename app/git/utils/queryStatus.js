const GitQuery = require('./query')

const parseStr = str => {
    const res = {
        index: str[0].trim(),
        workDir: str[1].trim(),
        str: str.slice(2).trim(),
        test: str,
        path: null,
        origin: null,
    }

    if (!res.index) res.index = null
    if (!res.workDir) res.workDir = null

    if (res.index === 'R' || res.workDir === 'R') {
        const [, p, , o] = res.str.match(
            /^\s?\"?([a-zA-Z0-9а-яА-Я\s\-\_\.]*)\"?(\s\-\>\s)\"?([a-zA-Z0-9а-яА-Я\s\-\_\.]*)\"?/,
        )
        res.path = p
        res.origin = o
    } else {
        res.path = res.str.replace(/^\"?/, '').replace(/\"?$/, '')
    }

    return res
}

/*


    ' ' = unmodified

    ? = undefined

    M = modified

    A = added

    D = deleted

    R = renamed

    C = copied

    U = updated but unmerged


*/

class QueryStatus extends GitQuery {
    constructor() {
        super('status --porcelain=v1')
        // super('status')
    }

    parse(res) {
        const { message } = super.parse(res)
        return message
            .split('\n')
            .filter(s => !!s)
            .map(parseStr)
    }
}

module.exports = QueryStatus
