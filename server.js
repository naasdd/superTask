const express = require('express')
const app = express()
const connect = require('./database/connect.js')
const Users = require('./model/users.js')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { raw } = require('mysql2')

const jwtKey = 'b2uvp2iodupwj-i7'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


app.get('/', (req, res) => {
    res.status(200).send("Hello world")
})

function verifyJWT(req, res, next){
    console.log(`> verifyJWT()`)
    const token = req.headers['x-acess-token']
    try{
        jwt.verify(token, jwtKey, (err, decoded) => {
            if(err) {
                return res.status(500).end()
            }

            req.validated = decoded
            next()
        })
    }
    catch(err){
        console.log(`X Failed at verifyJWT(), error: ${err}`)
    }
}

app.post('/signIn', async (req, res) => {
    console.log(`> Route /signIn called.`)
    const info = req.body
    const pass = toString(info.password)
    

    bcrypt.hash(pass, 10, async (err, hash) => {
        if(err) {
            console.log(`X err returned at hash, error: ${err}`)
            res.status(400)
        }
        
        try{
            console.log(`> hash is: ${hash}`)
            const insertInDatabase = await Users.create({email : info.email , username : info.username , password : hash})
            console.log(`_ ${insertInDatabase, {raw: true}}`)
            res.status(200).json({Message: "User signed in."})
        }
        catch(err){
            console.log(`X Failed at bycrypt.hash, error: ${err}`)
            res.status(500)
        }
    })
})

app.get('/logIn', (req, res) => {
    console.log(`> Route /logIn called.`)
    // to do login system..
})


connect.sync()
.then(() => {
    app.listen(3000)
    console.log(`> Server running.`)
})
.catch((err) => {
    console.error(`X Database sync failed, error: ${err}`)
})