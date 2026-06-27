let projetos = []

function updateProjects(workspaces_id) {
    return apiRequestJson('/listProject', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ workspaces_id })
    })
        .then((info) => {
            projetos = info
        })
}
