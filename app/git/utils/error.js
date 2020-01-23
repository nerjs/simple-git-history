class GitError extends Error {
    constructor(msg, pathname, str) {
        const message = (msg instanceof Error ? msg.stderr || msg.message : `${msg}`)
            .trim()
            .replace(/^error:/, '')
            .trim()
        super(message)

        this.message = message
        this.pathname = pathname
        this.str = str
        this.rowsMessage = this.message.split('\n')

        if (msg instanceof Error) {
            Object.keys(msg).forEach(key => {
                if (key === 'message' || key === 'name') return
                this[key] = msg[key]
            })
        }
    }

    get name() {
        return 'GitError'
    }
}

module.exports = GitError
