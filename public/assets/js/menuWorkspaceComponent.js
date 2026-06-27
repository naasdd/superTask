function opencreateWorkspace() {
    openMenuShowUp()

    const createWorkspace = buildHudPanel('form', 'createWorkspace', `
        <h1>Criar nova workspace</h1>
        <p>Nome desejado:</p>
        <input type="text" id="workspaceName" required>
        <button type="submit">Criar nova workspace</button>
    `)

    createWorkspace.addEventListener('submit', (event) => {
        event.preventDefault()
        confirmCreateWorkspace()
    })

    menuShowUp.setAttribute('onclick', 'closeCreateWorkspace()')
}

function closeCreateWorkspace() {
    closeHudPanelById('createWorkspace')
}

function openDeleteWorkspace(w) {
    openMenuShowUp()

    const createDeleteWorkspace = buildHudPanel('form', 'deleteWorkspace', `
        <h1>Deletar workspace?</h1>
        <div id="buttonConfirmDeleteWorkspace"></div>
        <button type="button" id="cancelDeleteWorkspaceButton">Cancelar</button>
    `)

    createDeleteWorkspace.dataset.workspaceId = String(w)
    createDeleteWorkspace.addEventListener('submit', (event) => {
        event.preventDefault()
        confirmDeleteWorkspace(Number(createDeleteWorkspace.dataset.workspaceId))
    })

    const confirmDeleteButton = document.createElement('button')
    confirmDeleteButton.type = 'submit'
    confirmDeleteButton.id = 'buttonConfirmDeleteWorkspace'
    setSafeText(confirmDeleteButton, 'Deletar Workspace')
    createDeleteWorkspace.querySelector('#buttonConfirmDeleteWorkspace').replaceWith(confirmDeleteButton)

    createDeleteWorkspace.querySelector('#cancelDeleteWorkspaceButton').addEventListener('click', () => {
        hudproject = true
        closeDeleteWorkspace()
    })

    menuShowUp.setAttribute('onclick', 'closeDeleteWorkspace()')
}

function closeDeleteWorkspace() {
    closeHudPanelById('deleteWorkspace')
}
