const queryString = require('query-string')

class GitQuery {
    constructor(str, format, valuesFormat) {
        if (!str || typeof str !== 'string') throw new TypeError('The query string is not a string')
        this.str = str.trim()
        this.format = format && typeof format === 'object' ? format : null
        this.valuesFormat = valuesFormat && typeof valuesFormat === 'object' ? valuesFormat : null
        this.hasGit = /^git/.test(this.str)
        this.hasInlineFormat = /\s--format=/.test(this.str)
    }

    toString() {
        return `${this.hasGit ? '' : 'git '}${this.str}${
            this.hasInlineFormat || !this.format
                ? ''
                : ` --format="${queryString.stringify(this.format, { encode: false })}"`
        }`
    }

    parse(str) {
        if (!this.hasInlineFormat && !this.format) return str

        const res = str
            .split('\n')
            .map(s => s.trim())
            .filter(s => !!s)

        return this.hasInlineFormat || !this.format
            ? res
            : res.map(s => {
                  const parsed = queryString.parse(s)

                  Object.keys(parsed).forEach(key => {
                      parsed[key] = parsed[key].trim()

                      if (this.valuesFormat.hasOwnProperty(key)) {
                          if (typeof this.valuesFormat[key] == 'function') {
                              parsed[key] = this.valuesFormat[key](parsed[key])
                          } else if (!parsed[key]) {
                              parsed[key] = this.valuesFormat[key]
                          }
                      }
                  })
                  return parsed
              })
    }
}

module.exports = GitQuery
