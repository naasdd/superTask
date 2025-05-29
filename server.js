const express = require('express')
const app = express()
const cors = require('cors')

const connect = require('./database/connect.js')
const { verifyJWT } = require('./middleware/verifyJWT.js')
const userController = require('./controller/userController.js')
const workspaceController = require('./controller/workspaceController.js')
const projectController = require('./controller/projectController.js')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile('./index.html')

})

app.get('/validateAccount', verifyJWT, userController.validateAccount)
app.post('/signIn', userController.signIn)
app.post('/logIn', userController.logIn)

app.post('/createWorkspace', verifyJWT, workspaceController.createWorkspace)
app.get('/listWorkspace', verifyJWT, workspaceController.listWorkspace)
app.delete('/deleteWorkspace', verifyJWT, workspaceController.deleteWorkspace)

app.post('/createProject', verifyJWT, projectController.createProject)
app.post('/listProject', verifyJWT, projectController.listProject)
app.delete('/deleteProject', verifyJWT, projectController.deleteProject)


connect.sync()
    .then(() => {
        app.listen(3000)
        console.log(`> Server running.`)
    })
    .catch((err) => {
        console.error(`X Database sync failed, error: ${err}`)
    })