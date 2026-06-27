function parseCookies(cookieHeader = '') {
    return cookieHeader.split(';').reduce((cookies, chunk) => {
        const [rawName, ...rest] = chunk.split('=')
        const name = rawName ? rawName.trim() : ''

        if (!name) {
            return cookies
        }

        const value = rest.join('=').trim()
        cookies[name] = decodeURIComponent(value)
        return cookies
    }, {})
}

function getCookieValue(req, name) {
    const cookies = parseCookies(req.headers.cookie || '')
    return cookies[name]
}

module.exports = { getCookieValue, parseCookies }
