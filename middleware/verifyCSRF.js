const crypto = require('crypto')
const { getCookieValue } = require('./sessionCookies.js')

function verifyCSRF(req, res, next) {
    const safeMethods = new Set(['GET', 'HEAD', 'OPTIONS'])

    if (safeMethods.has(req.method)) {
        return next()
    }

    const csrfCookie = getCookieValue(req, 'st_csrf')
    const csrfHeader = req.headers['x-csrf-token']

    if (!csrfCookie || !csrfHeader) {
        return res.status(403).json({ Error: 'CSRF token not accepted' })
    }

    const cookieBuffer = Buffer.from(String(csrfCookie))
    const headerBuffer = Buffer.from(String(csrfHeader))

    if (cookieBuffer.length !== headerBuffer.length) {
        return res.status(403).json({ Error: 'CSRF token not accepted' })
    }

    if (!crypto.timingSafeEqual(cookieBuffer, headerBuffer)) {
        return res.status(403).json({ Error: 'CSRF token not accepted' })
    }

    next()
}

module.exports = { verifyCSRF }
