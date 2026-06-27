let scriptsProjetosCarregados = false

function projects() {
    apiRequestJson('/validateAccount')
        .then(async () => {
            if (!scriptsProjetosCarregados) {
                scriptsProjetosCarregados = true
                await carregarScriptsProjetos()
            }

            estilo.href = './assets/css/projetos.css'
            setSafeText(titulo, 'Projetos')
            if (iconelogo && iconelogo.parentNode) {
                iconelogo.remove()
            }
        })
        .catch(() => {
            window.location.href = './login.html'
        })
}

function todo() {
    window.alert('Em desenvolvimento.')
}

function weeklytodo() {
    window.alert('Em desenvolvimento.')
}

async function carregarScriptsProjetos() {
    await loadScriptsSequentially([
        './assets/js/projectComponents.js',
        './assets/js/workspaceData.js',
        './assets/js/workspaceActions.js',
        './assets/js/workspaceView.js',
        './assets/js/projectData.js',
        './assets/js/projectActions.js',
        './assets/js/projectView.js',
        './assets/js/workspaceBootstrap.js'
    ])
}
