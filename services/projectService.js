const Projects = require('../model/projects.js')
const Workspaces = require('../model/workspaces.js')
const { DomainError } = require('./domainError.js')
const {
    normalizeOptionalString,
    normalizeProjectDate,
    requirePositiveInteger,
    requireTrimmedString
} = require('./domainUtils.js')

async function assertWorkspaceOwnedByUser(userId, workspaceId) {
    const workspace = await Workspaces.findOne({
        where: {
            id: workspaceId,
            user_id: userId
        },
        raw: true
    })

    if (!workspace) {
        throw new DomainError('Workspace not referred', 404)
    }

    return workspace
}

async function createProject({ userId, name, description, date, workspaces_id }) {
    const normalizedUserId = requirePositiveInteger(userId, 'Usuário autenticado')
    const normalizedWorkspaceId = requirePositiveInteger(workspaces_id, 'Workspace')
    const normalizedName = requireTrimmedString(name, 'Nome do projeto', { maxLength: 50 })
    const normalizedDescription = normalizeOptionalString(description, 'Descrição do projeto', { maxLength: 500 })
    const normalizedDate = normalizeProjectDate(date)

    await assertWorkspaceOwnedByUser(normalizedUserId, normalizedWorkspaceId)

    const create = await Projects.create({
        name: normalizedName,
        description: normalizedDescription,
        date: normalizedDate,
        workspaces_id: normalizedWorkspaceId
    })

    return { create }
}

async function listProject({ userId, workspaces_id }) {
    const normalizedUserId = requirePositiveInteger(userId, 'Usuário autenticado')
    const normalizedWorkspaceId = requirePositiveInteger(workspaces_id, 'Workspace')

    await assertWorkspaceOwnedByUser(normalizedUserId, normalizedWorkspaceId)

    return Projects.findAll({
        where: { workspaces_id: normalizedWorkspaceId }
    })
}

async function deleteProject({ userId, projectId }) {
    const normalizedUserId = requirePositiveInteger(userId, 'Usuário autenticado')
    const normalizedProjectId = requirePositiveInteger(projectId, 'Projeto')

    const project = await Projects.findOne({
        where: { id: normalizedProjectId },
        raw: true
    })

    if (!project) {
        throw new DomainError('Project not found', 404)
    }

    await assertWorkspaceOwnedByUser(normalizedUserId, project.workspaces_id)

    const deleted = await Projects.destroy({
        where: { id: normalizedProjectId }
    })

    if (!deleted) {
        throw new DomainError('Project not found', 404)
    }

    return { deleted: true }
}

module.exports = {
    createProject,
    deleteProject,
    listProject
}
