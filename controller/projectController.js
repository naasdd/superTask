const projectService = require('../services/projectService.js')
const { isDomainError } = require('../services/domainError.js')



const createProjectController = async (req, res) => {
    try {
        await projectService.createProject({
            userId: req.authenticatedUserId,
            name: req.body.name,
            description: req.body.description,
            date: req.body.date,
            workspaces_id: req.body.workspaces_id
        })

        res.status(200).json({ Message: "Project created" })
    }
    catch (err) {
        if (isDomainError(err)) {
            return res.status(err.statusCode).json({ err: err.message })
        }

        res.status(500).json({ err: 'Internal server error' })
    }
}

const listProjectController = async (req, res) => {
    try {
        const search = await projectService.listProject({
            userId: req.authenticatedUserId,
            workspaces_id: req.body.workspaces_id
        })

        res.status(200).json(search)
    }
    catch (err) {
        if (isDomainError(err)) {
            return res.status(err.statusCode).json({ err: err.message })
        }

        res.status(500).json({ err: 'Internal server error' })
    }
}


const deleteProjectController = async (req, res) => {
    try {
        await projectService.deleteProject({
            userId: req.authenticatedUserId,
            projectId: req.body.i
        })

        res.status(200).json({ Message: "deleted" })
    }
    catch (err) {
        if (isDomainError(err)) {
            return res.status(err.statusCode).json({ err: err.message })
        }

        res.status(500).json({ Message: 'Internal server error' })
    }
}

module.exports = {
    createProject: createProjectController,
    deleteProject: deleteProjectController,
    listProject: listProjectController
}
