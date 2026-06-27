const { DomainError } = require('./domainError.js')

function requireTrimmedString(value, fieldName, { maxLength } = {}) {
    if (typeof value !== 'string') {
        throw new DomainError(`${fieldName} inválido.`, 400)
    }

    const normalized = value.trim()

    if (!normalized) {
        throw new DomainError(`${fieldName} inválido.`, 400)
    }

    if (typeof maxLength === 'number' && normalized.length > maxLength) {
        throw new DomainError(`${fieldName} muito longo.`, 400)
    }

    return normalized
}

function requirePositiveInteger(value, fieldName) {
    const numericValue = Number(value)

    if (!Number.isInteger(numericValue) || numericValue < 1) {
        throw new DomainError(`${fieldName} inválido.`, 400)
    }

    return numericValue
}

function normalizeOptionalString(value, fieldName, { maxLength } = {}) {
    if (value == null || value === '') {
        return null
    }

    return requireTrimmedString(value, fieldName, { maxLength })
}

function normalizeProjectDate(value) {
    if (value == null || value === '' || value === 'undefined/undefined/') {
        return null
    }

    if (typeof value !== 'string') {
        throw new DomainError('Data do projeto inválida.', 400)
    }

    const normalized = value.trim()

    if (!normalized) {
        return null
    }

    return normalized
}

module.exports = {
    normalizeOptionalString,
    normalizeProjectDate,
    requirePositiveInteger,
    requireTrimmedString
}
