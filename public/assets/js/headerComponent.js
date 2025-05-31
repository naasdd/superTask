let bodyHeader = document.querySelector('header')
let scriptsProjetosCarregados = false

bodyHeader.innerHTML =
    `<div class="iconeHeader">
            <div class="ponto1"></div>
            <div class="ponto2"></div>
            <div class="ponto3"></div>
        </div>
        <div class="menu">
            <i class="bi bi-person-circle bi-lg" onclick="userIcon()"></i>
            <i class="bi bi-columns-gap bi-xl" onclick="projects()"></i>
            <i class="bi bi-clipboard-check bi-2x" onclick="todo()"></i>
            <i class="bi bi-ui-checks bi-3x" onclick="weeklytodo()"></i>
        </div>`



function userIcon() {
    fetch('/validateAccount', {
        headers: { 'x-access-token': token }
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                window.location.href = './login.html'
                throw new Error('Failed to fetch projects');
            }
        })
        .then((data) => {
            window.alert(`Email: ${data.email}\nUsuario: ${data.username}`)

        })
}



function projects() {
    fetch('/validateAccount', {
        headers: { 'x-access-token': token }
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                window.location.href = './login.html'
                throw new Error('Failed to fetch projects');
            }
        })
        .then((data) => {
            if (!scriptsProjetosCarregados) {
                carregarScriptsProjetos()
                scriptsProjetosCarregados = true
            }

            setTimeout(() => {
                updateWorkspace()
                estilo.href = './assets/css/projetos.css'
                titulo.innerHTML = `Projetos`
                iconelogo.remove()
                titulosupertask.remove()
                setTimeout(() => {
                    const first = workspaces[0].id
                    selectWorkspace(first)
                }, 100);
                drawProjects()

            }, 100);
        })
}


function todo() { window.alert("Em desenvolvimento.") }
function weeklytodo() { window.alert("Em desenvolvimento.") }



function carregarScriptsProjetos() {
    const scripts = [
        './assets/js/projectComponents.js',
        './assets/js/workspaceProjectsComponent.js',
        './assets/js/projetos.js'
    ]

    scripts.forEach(src => {
        const script = document.createElement('script')
        script.src = src
        document.body.appendChild(script)
    })
}