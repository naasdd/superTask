const jwt = require('jsonwebtoken')
const Users = require('../model/users.js')
const { getCookieValue } = require('./sessionCookies.js')
require('dotenv').config()

const jwtKey = process.env._JWTkey

async function verifyJWT(req, res, next) {
    const token = getCookieValue(req, 'st_auth')

    if (!token) {
        return res.status(401).json({ Error: 'Token not accepted' })
    }

    try {
        const decoded = jwt.verify(token, jwtKey)
        const searchAll = decoded.userId
            ? await Users.findByPk(decoded.userId, { raw: true })
            : await Users.findOne({ where: { email: decoded.email }, raw: true })

        if (!searchAll) {
            return res.status(401).json({ Error: 'Token not accepted' })
        }

        req.authenticatedUserId = searchAll.id
        req.authenticatedUserEmail = searchAll.email
        req.authenticatedUser = searchAll
        req.decoded = decoded
        req.token = token
        next()
    }
    catch (err) {
        return res.status(401).json({ Error: 'Token not accepted' })
    }
}

module.exports = { verifyJWT, jwtKey }
