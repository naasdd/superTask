const workspaceService = require('../services/workspaceService.js')
const { isDomainError } = require('../services/domainError.js')


const createWorkspaceController = async (req, res) => {
    try {
        const client = req.authenticatedUserEmail
        console.log(`\n\n> Route /createWorkspace requested by: ${client}`)

        const creating = await workspaceService.createWorkspace({
            userId: req.authenticatedUserId,
            workspaceName: req.body.workspaceName
        })

        console.log(`> Workspace created at database`)
        res.status(200).json(creating)
    }
    catch (err) {
        if (isDomainError(err)) {
            return res.status(err.statusCode).json({ err: err.message })
        }

        console.log(`X Error during creating workspace, error: ${err}`)
        res.status(500).json({ err: 'Internal server error' })
    }
}

const listWorkspaceController = async (req, res) => {
    try {
        const client = req.authenticatedUserEmail
        console.log(`\n\n> Route /listWorkspace requested by: ${client}`)

        const searchWorkspace = await workspaceService.listWorkspace({
            userId: req.authenticatedUserId
        })

        res.status(200).json(searchWorkspace)
    }
    catch (err) {
        if (isDomainError(err)) {
            return res.status(err.statusCode).json({ err: err.message })
        }

        console.log(`X Error during listing workspace`)
        res.status(500).json({ err: 'Internal server error' })
    }
}

const deleteWorkspaceController = async (req, res) => {
    try {
        const client = req.authenticatedUserEmail
        console.log(`\n\n> Route /deleteWorkspace requested by: ${client}`)

        await workspaceService.deleteWorkspace({
            userId: req.authenticatedUserId,
            workToDelete: req.body.workToDelete
        })

        console.log(`> Workspace deleted`)
        res.status(200).json({ Message: "Workspace deleted" })
    }
    catch (err) {
        if (isDomainError(err)) {
            return res.status(err.statusCode).json({ Message: err.message })
        }

        console.log(`X Error during deleting workspace, erro ${err}`)
        res.status(500).json({ Message: "Error during deleting workspace" })
    }

}


module.exports = {
    createWorkspace: createWorkspaceController,
    deleteWorkspace: deleteWorkspaceController,
    listWorkspace: listWorkspaceController
}
