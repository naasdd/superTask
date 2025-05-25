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

    if (info.email == "" || info.password == "" || info.email == null || info.password == null) {
        console.log(`> Invalid input`)
        return res.status(400).json({ Message: "Invalid input" })
    }

    const searchOnDatabase = await Users.findOne({ where: { email: info.email }, raw: true })
    if (searchOnDatabase != null) {
        return res.status(403).json({ Message: "Email already used." });
    }



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
            console.log(`X Failed at signin, error: ${err}`)
            res.status(500)
        }
    })
}

const logIn = async (req, res) => {
    console.log(`> Route /logIn called.`)
    const info = req.body
    const pass = info.password

    if (info.email == "" || info.password == "" || info.email == null || info.password == null) {
        console.log(`X Invalid input`)
        return res.status(400).json({ Message: "Entradas inválidas" })
    }

    const searchOnDatabase = await Users.findOne({ where: { email: info.email }, raw: true })
    if (searchOnDatabase == null) {
        return res.status(404).json({ Message: "Usuário não encontrado" });
    }

    try {
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
        res.status(500).json({ Message: `Error: ${err}` })
    }
}

module.exports = { validateAccount, signIn, logIn }