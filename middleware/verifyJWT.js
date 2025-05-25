const jwt = require('jsonwebtoken')
const Users = require('../model/users.js')

const jwtKey = 'b2uvp2iodupwj-i7'

function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token']
    try {
        jwt.verify(token, jwtKey, async (err, decoded) => {
            if (err) {
                console.log(`X token not accepted`)
                return res.status(400).json({ Error: 'Token not accepted' })
            }
            console.log('> Token accepted')
            const searchAll = await Users.findOne({ where: { email: decoded.email } })

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