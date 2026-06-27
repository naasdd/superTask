let wContainer = document.getElementById('wContainer')
let iconDeletarWorkspace = document.getElementById('iconDeletarWorkspace')

function drawWorkspace(selectedWorkspace) {
    wContainer.textContent = ''

    for (let i = 0; i < workspaces.length; i++) {
        const workspaceItem = document.createElement('div')
        const isActive = selectedWorkspace == workspaces[i].id

        if (selectedWorkspace == workspaces[i].id) {
            setSafeText(tituloContainer, workspaces[i].workspaceName)
            setSafeText(titulo, `${workspaces[i].workspaceName} | Super Task`)
            iconDeletarWorkspace.textContent = ''

            const deleteIcon = document.createElement('i')
            deleteIcon.className = 'bi bi-trash'
            deleteIcon.addEventListener('click', () => openDeleteWorkspace(workspaces[i].id))
            iconDeletarWorkspace.appendChild(deleteIcon)
        }

        workspaceItem.className = isActive ? 'workspace-active' : 'workspace'
        workspaceItem.id = String(workspaces[i].id)
        setSafeText(workspaceItem, workspaces[i].workspaceName)
        workspaceItem.addEventListener('click', () => selectWorkspace(workspaces[i].id))
        wContainer.appendChild(workspaceItem)
    }
}

function selectWorkspace(w) {
    wrkselected = w
    setTimeout(function () {
        drawWorkspace(wrkselected)

        updateProjects(wrkselected).then(() => {
            drawProjects(wrkselected)
            setTimeout(function () {
                container.style.animation = 'none'
                tituloContainer.style.animation = 'none'

            }, 1400)

        })
    }, 600)

    container.style.animation = 'transicaoContainer 2s cubic-bezier(0.19, 1, 0.22, 1) .1s both'
    tituloContainer.style.animation = 'transicaoContainer 2s cubic-bezier(0.19, 1, 0.22, 1) .1s both'
}
