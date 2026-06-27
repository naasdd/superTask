class DomainError extends Error {
    constructor(message, statusCode = 400, code = 'BAD_REQUEST') {
        super(message)
        this.name = 'DomainError'
        this.statusCode = statusCode
        this.code = code
    }
}

function isDomainError(error) {
    return error instanceof DomainError
}

module.exports = { DomainError, isDomainError }
