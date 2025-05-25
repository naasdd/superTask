const Projects = require('../model/projects.js')
const Users = require('../model/users.js')
const Workspaces = require('../model/workspaces.js')



const createProject = async (req, res) => {
    const client = req.decoded.email
    console.log(`> Route /createProject requested by: ${client}`)
    const name = req.body.name
    const description = req.body.description
    let date = req.body.date
    const workspaces_id = req.body.workspaces_id

    try {
        if (name == null) {
            throw new Error('Name is null')
        }
        else if (workspaces_id == 0) {
            throw new Error('You should create a workspace before.')
        }
        else {
            if (date == 'undefined/undefined/') {
                date = null
            }
            const create = await Projects.create({ name: name, description: description, date: date, workspaces_id: workspaces_id })
            console.log(`> Project created.`)
            res.status(200).json({ Message: "Project created" })
        }
    }
    catch (err) {
        console.log(`X Error during creating project. error: ${err}`)
        res.status(500).json({ err: err.message })
    }
}

const listProject = async (req, res) => {
    const client = req.decoded.email
    console.log(`> Route /listProject requested by: ${client}`)
    const workspaces_id = req.body.workspaces_id
    try {
        const search = await Projects.findAll({ where: { workspaces_id: workspaces_id } })
        res.status(200).json(search)
    }
    catch (err) {
        console.log(`X Error during list project. error: ${err}`)
        res.status(500).json(err)
    }
}

const deleteProject = async (req, res) => {
    const client = req.decoded.email
    console.log(`> Route /deleteProject requested by: ${client}`)
    const reqid = req.body.i
    try {
        await Projects.destroy({ where: { id: reqid } })
        console.log(`> Project destroyed`)
        res.status(200).json({ Message: "deleted" })
    }
    catch (err) {
        console.log(`X Error during delete project. error: ${err}`)
        res.status(500).json(err)
    }
}

module.exports = { createProject, listProject, deleteProject }