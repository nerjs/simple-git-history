const QueryFormat = require('./queryFormat')

class QueryLog extends QueryFormat {
    constructor(skip = 0, maxCount = 10, format) {
        super(`log --max-count=${maxCount} --skip=${skip}`, format)
    }
}

module.exports = QueryLog
