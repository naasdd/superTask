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
            openUserIcon(data)
        })
}

function openUserIcon(data) {
    openMenuShowUp()


    let userIconMenu = document.createElement('div')
    userIconMenu.id = "userIconMenu"
    userIconMenu.style.display = 'flex'

    userIconMenu.setAttribute('onmouseover', 'overcreatehud()')
    userIconMenu.setAttribute('onmouseout', 'outcreatehud()')

    menuShowUp.appendChild(userIconMenu)

    userIconMenu.innerHTML = `<div id="divImgUser">
                    <i class="bi bi-person-circle bi-lg"></i>
                </div>
                <p id="userEmail">${data.email}</p>
                <button onclick="logout()">Sair da conta</button>
                <button onclick="fechar_usericon()">Cancelar</button>`

    menuShowUp.setAttribute('onclick', 'closeUserIcon()')
}

function fechar_usericon(){
    hudproject = true
    closeUserIcon()
}

function closeUserIcon() {
    let userIconMenu = document.getElementById('userIconMenu')
    if (hudproject) {
        menuShowUp.style.animation = 'opacidadeinversa 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'
        userIconMenu.style.animation = 'opacidadeinversa 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'

        menuShowUp.setAttribute('onclick', 'closeMenu()')

        // "timer" para que esses códigos apenas sejam rodados depois de acabar a animacao anterior
        setTimeout(function () {
            hudproject = false


            menuShowUp.style.display = 'none';
            userIconMenu.style.display = 'none'

            menuShowUp.style.animation = 'bluranimation 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'
            userIconMenu.style.animation = 'bluranimation 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'

            userIconMenu.remove()
        }, 700);
    }
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
                drawProjects()

            }, 100);
        })
}


function todo() { window.alert("Em desenvolvimento.") }
function weeklytodo() { window.alert("Em desenvolvimento.") }
function logout() {
    localStorage.removeItem("token")
    window.location.href = './login.html' 
}



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