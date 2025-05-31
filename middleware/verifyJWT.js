const jwt = require('jsonwebtoken')
const Users = require('../model/users.js')
require('dotenv').config()

const jwtKey = process.env._JWTkey

function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token']
    try {
        jwt.verify(token, jwtKey, async (err, decoded) => {
            if (err) {
                console.log(`X token not accepted, err: ${err}\n\n`)
                return res.status(400).json({ Error: 'Token not accepted' })
            }
            const searchAll = await Users.findOne({ where: { email: decoded.email } })
            console.log(`\n> Token accepted, identyfied as ${searchAll.email}`)

            req.userInfoDB = searchAll
            req.decoded = decoded
            req.token = token
            next()
        })
    }
    catch (err) {
        console.log(`X Failed at verifyJWT(), error: ${err}`)
    }
}

module.exports = { verifyJWT, jwtKey }