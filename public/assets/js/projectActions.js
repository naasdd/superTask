function createProject() {
    const name = document.getElementById('projectname').value
    const description = document.getElementById('projectdesc').value
    const datap = document.getElementById('projectdate').value

    const date = datap
        ? `${datap.split('-')[2]}/${datap.split('-')[1]}/${datap.split('-')[0]}`
        : null

    const workspaces_id = wrkselected

    apiRequestJson('/createProject', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description, date, workspaces_id })
    })
        .then(() => {
            updateProjects(workspaces_id)
            hudproject = true
            closeCreateProject()
            document.getElementById('projectdate').value = ''
            document.getElementById('projectname').value = ''
            document.getElementById('projectdesc').value = ''
            setTimeout(() => {
                drawProjects()
            }, 500)
        })
        .catch(err => {
            alertMessage(`Não foi possível criar projeto, ${err}`)
            hudproject = true
            closeCreateProject()
        })
}

function deleteProject(i) {
    apiRequestJson('/deleteProject', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ i })
    })
        .then(() => {
            updateProjects(wrkselected)
            setTimeout(() => {
                drawProjects()
                fechar_vermais()
            }, 500)
        })
}
