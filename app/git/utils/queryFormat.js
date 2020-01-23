const queryString = require('query-string')
const GitQuery = require('./query')

class QueryFormat extends GitQuery {
    constructor(str, format, valuesFormat) {
        super(str)
        this.format = format && typeof format === 'object' ? format : null
        this.valuesFormat = valuesFormat && typeof valuesFormat === 'object' ? valuesFormat : null
        this.hasInlineFormat = /\s--format=/.test(this.str)
    }

    toString() {
        const isFormat =
            this.hasInlineFormat || !this.format
                ? ''
                : ` --format="${queryString.stringify(this.format, { encode: false })}"`

        return `${super.toString()}${isFormat}`
    }

    parse(result) {
        const { message } = super.parse(result)

        if (!this.hasInlineFormat && !this.format) return message

        const res = message
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

module.exports = QueryFormat
