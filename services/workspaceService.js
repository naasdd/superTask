const Users = require('../model/users.js')
const Projects = require('../model/projects.js')
const Workspaces = require('../model/workspaces.js')
const { DomainError } = require('./domainError.js')
const { requirePositiveInteger, requireTrimmedString } = require('./domainUtils.js')

async function createWorkspace({ userId, workspaceName }) {
    const normalizedUserId = requirePositiveInteger(userId, 'Usuário autenticado')
    const normalizedWorkspaceName = requireTrimmedString(workspaceName, 'Nome da workspace', { maxLength: 50 })

    const workspaceCount = await Workspaces.count({ where: { user_id: normalizedUserId } })

    if (workspaceCount >= 5) {
        throw new DomainError('Você não pode criar mais que 5 workspaces.', 400)
    }

    const user = await Users.findByPk(normalizedUserId, { raw: true })

    if (!user) {
        throw new DomainError('Usuário não encontrado.', 404)
    }

    const creating = await Workspaces.create({
        workspaceName: normalizedWorkspaceName,
        user_id: normalizedUserId
    })

    return { creating }
}

async function listWorkspace({ userId }) {
    const normalizedUserId = requirePositiveInteger(userId, 'Usuário autenticado')

    return Workspaces.findAll({
        where: { user_id: normalizedUserId },
        raw: true
    })
}

async function deleteWorkspace({ userId, workToDelete }) {
    const normalizedUserId = requirePositiveInteger(userId, 'Usuário autenticado')
    const workspaceId = requirePositiveInteger(workToDelete, 'Workspace')

    const ownedWorkspace = await Workspaces.findOne({
        where: {
            id: workspaceId,
            user_id: normalizedUserId
        },
        raw: true
    })

    if (!ownedWorkspace) {
        throw new DomainError('Workspace not referred', 404)
    }

    await Projects.destroy({
        where: { workspaces_id: workspaceId }
    })

    const deleteWorkspaceDB = await Workspaces.destroy({
        where: { id: workspaceId, user_id: normalizedUserId }
    })

    if (!deleteWorkspaceDB) {
        throw new DomainError('Workspace not referred', 404)
    }

    return { deleted: true }
}

module.exports = {
    createWorkspace,
    deleteWorkspace,
    listWorkspace
}
