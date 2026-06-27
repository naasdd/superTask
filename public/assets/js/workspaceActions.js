function addworkspace() {
    if (workspaces.length >= 5) {
        window.alert('Você não pode criar mais que 5 workspaces')
    }
    else {
        opencreateWorkspace()
    }
}

function confirmCreateWorkspace() {
    const workspaceName = document.getElementById('workspaceName').value
    apiRequestJson('/createWorkspace', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ workspaceName })
    })
        .then((info) => {
            const workspaces_id = info.creating.id
            updateWorkspace(workspaces_id)
            document.getElementById('workspaceName').value = ''
            setTimeout(() => {
                hudproject = true
                closeCreateWorkspace()
            }, 200)

        })
        .catch(err => {
            alertMessage(`Não foi possível criar workspace, ${err}`)
            hudproject = true
            closeCreateWorkspace()

        })
}

function confirmDeleteWorkspace(w) {
    apiRequestJson('/deleteWorkspace', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "workToDelete": w })
    })
        .then(resposta => {
            alertMessage(resposta.Message)
            updateWorkspace().then(() => {
                hudproject = true
                closeDeleteWorkspace()
            })
        })
}
