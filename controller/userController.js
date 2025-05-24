const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Users = require('../model/users.js')
const { jwtKey } = require('../middleware/verifyJWT.js')


const validateAccount = (req, res) => {
    const info = req.userInfoDB
    res.status(200).json({ email: info.email, username: info.username })
}

const signIn = async (req, res) => {
    console.log(`> Route /signIn called.`)
    const info = req.body
    const pass = info.password


    bcrypt.hash(pass, 10, async (err, hash) => {
        if (err) {
            console.log(`X err returned at hash, error: ${err}`)
            res.status(400)
        }

        try {
            console.log(`> hash is: ${hash}`)
            const insertInDatabase = await Users.create({ email: info.email, username: info.username, password: hash })
            res.status(200).json({ Message: "User signed in." })
        }
        catch (err) {
            console.log(`X Failed at bycrypt.hash, error: ${err}`)
            res.status(500)
        }
    })
}

const logIn = async (req, res) => {
    console.log(`> Route /logIn called.`)
    const info = req.body
    const pass = info.password

    try {
        const searchOnDatabase = await Users.findOne({ where: { email: info.email }, raw: true })

        if (searchOnDatabase == null) {
            throw new Error("User not found");
        }
        
        const result = bcrypt.compareSync(pass, searchOnDatabase.password)

        if (result) {
            const token = jwt.sign({ email: searchOnDatabase.email }, jwtKey, { expiresIn: '7d' })
            res.status(200).json({ auth: true, token })
        }
        else {
            res.status(401).json({ auth: false, Message: "not allowed" })
        }
    }
    catch (err) {
        console.log(`X Error on route /logIn, error: ${err}`)
        res.status(500).json({ Message: `Some fucking error: ${err}` })
    }
}

module.exports = { validateAccount, signIn, logIn }