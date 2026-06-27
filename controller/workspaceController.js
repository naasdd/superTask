const workspaceService = require('../services/workspaceService.js')
const { isDomainError } = require('../services/domainError.js')


const createWorkspaceController = async (req, res) => {
    try {
        const creating = await workspaceService.createWorkspace({
            userId: req.authenticatedUserId,
            workspaceName: req.body.workspaceName
        })

        res.status(200).json(creating)
    }
    catch (err) {
        if (isDomainError(err)) {
            return res.status(err.statusCode).json({ err: err.message })
        }

        res.status(500).json({ err: 'Internal server error' })
    }
}

const listWorkspaceController = async (req, res) => {
    try {
        const searchWorkspace = await workspaceService.listWorkspace({
            userId: req.authenticatedUserId
        })

        res.status(200).json(searchWorkspace)
    }
    catch (err) {
        if (isDomainError(err)) {
            return res.status(err.statusCode).json({ err: err.message })
        }

        res.status(500).json({ err: 'Internal server error' })
    }
}

const deleteWorkspaceController = async (req, res) => {
    try {
        await workspaceService.deleteWorkspace({
            userId: req.authenticatedUserId,
            workToDelete: req.body.workToDelete
        })

        res.status(200).json({ Message: "Workspace deleted" })
    }
    catch (err) {
        if (isDomainError(err)) {
            return res.status(err.statusCode).json({ Message: err.message })
        }

        res.status(500).json({ Message: "Error during deleting workspace" })
    }

}


module.exports = {
    createWorkspace: createWorkspaceController,
    deleteWorkspace: deleteWorkspaceController,
    listWorkspace: listWorkspaceController
}
