const Workspaces = require('../model/workspaces.js')
const Users = require('../model/users.js')


const createWorkspace = async (req, res) => {
    const client = req.decoded.email
    console.log(`\n\n> Route /createWorkspace requested by: ${client}`)

    const workspaceName = req.body.workspaceName
    const clientID = req.userInfoDB.id
    try {
        if (workspaceName == null || workspaceName.trim() == '' || clientID == null || clientID == NaN || clientID < 1) {
            throw new Error('Invalid input')
        }
        else {
            const creating = await Workspaces.create({ workspaceName: workspaceName, user_id: clientID })
            console.log(`> Workspace created at database`)
            res.status(200).json({ creating })
        }
    }
    catch (err) {
        console.log(`X Error during creating workspace, error: ${err}`)
        res.status(500).json({ err: err.message })
    }

}

const listWorkspace = async (req, res) => {
    const userInfoDB = req.userInfoDB
    const client = req.decoded.email
    console.log(`\n\n> Route /listWorkspace requested by: ${client}`)

    try {
        const searchWorkspace = await Workspaces.findAll({ where: { user_id: userInfoDB.id }, raw: true })
        res.status(200).json(searchWorkspace)
    }
    catch (err) {
        console.log(`X Error during listing workspace`)
        res.status(500)
    }
}

const deleteWorkspace = async (req, res) => {
    const client = req.decoded.email
    console.log(`\n\n> Route /deleteWorkspace requested by: ${client}`)

    const userInfoDB = req.userInfoDB
    const workToDelete = req.body.workToDelete

    if (workToDelete == undefined) { return res.status(400).json({ Message: "Workspace not referred" }) }

    try {
        const searchOnDatabase = await Users.findAll({ where: { email: userInfoDB.email } })
        const jsonSearchOnDatabase = JSON.stringify({ searchOnDatabase })
        console.log(`> /deleteWorkspace User.email = ${searchOnDatabase[0].email}`)
        console.log(`\n[DEBBUG] worktToDelete = ${workToDelete}\n`)

        const deleteWorkspaceDB = await Workspaces.destroy({ where: { id: workToDelete, user_id: searchOnDatabase[0].id } })

        if (deleteWorkspaceDB) {
            console.log(`> Workspace deleted`)
            res.status(200).json({ Message: "Workspace deleted" })
        }
        else if (!deleteWorkspaceDB) {
            console.log(`> Workspace NOT deleted`)
            res.status(200).json({ Message: "Workspace NOT deleted" })
        }
    }
    catch (err) {
        console.log(`X Error during deleting workspace, erro ${err}`)
        res.status(500).send("Error during deleting workspace")
    }

}


module.exports = { createWorkspace, listWorkspace, deleteWorkspace }