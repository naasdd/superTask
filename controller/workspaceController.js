const Workspaces = require('../model/workspaces.js')
const Users = require('../model/users.js')


const createWorkspace = async (req, res) => {
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
}

const listWorkspace = async (req, res) => {
    const userInfoDB = req.userInfoDB

    try {
        const searchWorkspace = await Workspaces.findAll({ where: { user_id: userInfoDB.id }, raw: true })
        res.status(200).json(searchWorkspace)
    }
    catch (err) {
        console.log(`X Error during listing workspace`)
        res.status(500)
    }
}

module.exports = { createWorkspace, listWorkspace }