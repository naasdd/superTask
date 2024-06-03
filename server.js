const express = require('express')
const app = express()
const connect = require('./database/connect.js')
const Users = require('./model/users.js')
const Workspaces = require('./model/workspaces.js')
const Projects = require('./model/projects.js')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const jwtKey = 'b2uvp2iodupwj-i7'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static(__dirname + '/public'))


app.get('/', (req, res) => {
    res.sendFile('./index.html')

})

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

app.get('/validateAccount', verifyJWT, (req, res) => {
    const info = req.userInfoDB
    res.status(200).json({ email: info.email, username: info.username})
})

app.post('/signIn', async (req, res) => {
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
})

app.post('/logIn', async (req, res) => {
    console.log(`> Route /logIn called.`)
    const info = req.body
    const pass = info.password

    const searchOnDatabase = await Users.findOne({ where: { email: info.email }, raw: true })
    const result = bcrypt.compareSync(pass, searchOnDatabase.password)

    try {
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
})


app.post('/createWorkspace', verifyJWT, async (req, res) => {
    const client = req.decoded.email
    console.log(`> Route /createWorkspace requested by: ${client}`)

    const workspaceName = req.body.workspaceName
    const clientID = req.userInfoDB.id
    if (workspaceName !== null && clientID != null) {
        try {
            const creating = await Workspaces.create({ workspaceName: workspaceName, user_id: clientID })
            console.log(`> Workspace created at database`)
            res.status(200).json({ creating })
        }
        catch (err) {
            console.log(`X Error during creating workspace`)
            res.status(500)
        }
    }
    else {
        res.status(400).json({ Message: "Need more info." })
    }


})

app.get('/listWorkspace', verifyJWT, async (req, res) => {
    const userInfoDB = req.userInfoDB

    try {
        const searchWorkspace = await Workspaces.findAll({ where: { user_id: userInfoDB.id }, raw: true })
        res.status(200).json(searchWorkspace)
    }
    catch (err) {
        console.log(`X Error during listing workspace`)
        res.status(500)
    }
})



app.post('/createProject', verifyJWT, async (req, res) => {
    const client = req.decoded.email
    console.log(`> Route /createProject requested by: ${client}`)
    const name = req.body.name
    const description = req.body.description
    let date = req.body.date
    const workspaces_id = req.body.workspaces_id

    
    try{
        if(name == null){
            throw new Error('Name is null')
        }
        else{
            if(date == 'undefined/undefined/'){
                date = null
            }
            const create = await Projects.create({ name : name, description : description, date : date, workspaces_id : workspaces_id})
            console.log(`> Project created.`)
            res.status(200).json({Message: "Project created"})
        }
    }
    catch(err){
        console.log(`X Error during creating project. error: ${err}`)
        res.status(500).json({err})
    }
})

app.post('/listProject', verifyJWT, async (req, res) => {
    const client = req.decoded.email
    console.log(`> Route /listProject requested by: ${client}`)
    const workspaces_id = req.body.workspaces_id
    try{
        const search = await Projects.findAll({ where: {workspaces_id : workspaces_id}})
        res.status(200).json(search)
    }
    catch(err){
        console.log(`X Error during list project. error: ${err}`)
        res.status(500).json(err)
    }
})



connect.sync()
    .then(() => {
        app.listen(3000)
        console.log(`> Server running.`)
    })
    .catch((err) => {
        console.error(`X Database sync failed, error: ${err}`)
    })