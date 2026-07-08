let scriptsProjetosCarregados = false
let scriptsTarefasSemanaisCarregados = false

function projects() {
    apiRequestJson('/validateAccount')
        .then(async () => {
            let weeklyTasksContainer = document.getElementById('weeklyTasksContainer')
            if (weeklyTasksContainer) {
                weeklyTasksContainer.style.display = 'none'
            }

            let header = document.querySelector('header')
            if (header) {
                header.style.borderRight = 'solid 1px var(--icons)'
            }

            let bodySection = document.querySelector('section')
            if (bodySection) {
                bodySection.style.display = 'flex'
            }

            if (!scriptsProjetosCarregados) {
                scriptsProjetosCarregados = true
                await carregarScriptsProjetos()
            } else {
                let projectsContainer = document.getElementById('container')
                let projectsHeader = document.querySelector('.divPartedecima')
                if (projectsContainer) {
                    projectsContainer.style.display = (typeof projetos !== 'undefined' && projetos.length === 0) ? 'flex' : 'grid'
                }
                if (projectsHeader) {
                    projectsHeader.style.display = 'flex'
                }
                if (typeof updateWorkspace === 'function') {
                    updateWorkspace()
                }
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
    apiRequestJson('/validateAccount')
        .then(async () => {
            if (iconelogo && iconelogo.parentNode) {
                iconelogo.remove()
            }

            if (!scriptsTarefasSemanaisCarregados) {
                scriptsTarefasSemanaisCarregados = true
                await carregarScriptsTarefasSemanais()
            } else {
                if (typeof weeklytodoPageLoad === 'function') {
                    weeklytodoPageLoad()
                }
            }

            estilo.href = './assets/css/tarefasSemanais.css'
            setSafeText(titulo, 'Tarefas Semanais')
        })
        .catch(() => {
            window.location.href = './login.html'
        })
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

async function carregarScriptsTarefasSemanais() {
    await loadScriptsSequentially([
        './assets/js/weeklyTodoComponents.js'
    ])
}
