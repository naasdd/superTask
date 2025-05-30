let tituloproj = document.getElementById('tituloproj')
let descproj = document.getElementById('descproj')
let dataproj = document.getElementById('dataproj')
let acoes = document.getElementById('acoes')
let divstatus = document.getElementById('divstatus')

let workspaces = []

let wrkselected = 0

let projetos = []

let projectname = ''
let projectdesc = ''
let projectdate = ''
let criarprojeto = document.getElementById('criarProjeto')
let projetoContainer = document.getElementById('projetoContainer')
let vermaisContainer = document.getElementById('vermaisContainer')
let hudproject = false
let container = document.getElementById('container')

let wContainer = document.getElementById('wContainer')

let tituloContainer = document.getElementById('tituloContainer')
let createWorkspace = document.getElementById('createWorkspace')
let workspaceName = document.getElementById('workspaceName').value

let iconDeletarWorkspace = document.getElementById('iconDeletarWorkspace')
let deleteWorkspace = document.getElementById('deleteWorkspace')
let buttonConfirmDeleteWorkspace = document.getElementById('buttonConfirmDeleteWorkspace')

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
        })
}

function todo() { window.alert("Em desenvolvimento.") }
function weeklytodo() { window.alert("Em desenvolvimento.") }


function updateWorkspace() {
    return fetch('/listWorkspace', {
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
        .then((info) => {
            workspaces = info
            if (workspaces.length == 0) {
                opencreateWorkspace()
            }
            else {
                drawWorkspace(workspaces[0].id)
                selectWorkspace(workspaces[0].id)
            }
        })
}



function addworkspace() {
    if (workspaces.length >= 5) {
        window.alert('Você não pode criar mais que 5 workspaces')
    }
    else {
        opencreateWorkspace()
    }
}

function confirmCreateWorkspace() {
    let workspaceName = document.getElementById('workspaceName').value
    fetch('/createWorkspace', {
        method: 'POST',
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ workspaceName })
    })
        .then(response => response.json())
        .then(info => {
            updateWorkspace()
            document.getElementById('workspaceName').value = ''
            setTimeout(() => {
                const workspaces_id = info.creating.id
                drawWorkspace()
                hudproject = true
                closecreate()
                selectWorkspace(workspaces_id)
            }, 200);

        })
}

// para posicionar as workspace's na sidebar
function drawWorkspace(wrkselected) {
    wContainer.innerHTML = ''

    for (let i = 0; i < workspaces.length; i++) {
        if (wrkselected == workspaces[i].id) {
            tituloContainer.innerHTML = workspaces[i].workspaceName
            iconDeletarWorkspace.innerHTML = `<i class="bi bi-trash" onclick="openDeleteWorkspace(${workspaces[i].id})"></i>`
            wContainer.innerHTML += `<div class="workspace-active" id="${workspaces[i].id}" onclick="selectWorkspace(${workspaces[i].id})">${workspaces[i].workspaceName}</div>`
        }
        else {
            wContainer.innerHTML += `<div class="workspace" id="${workspaces[i].id}" onclick="selectWorkspace(${workspaces[i].id})">${workspaces[i].workspaceName}</div>`
        }
    }
}

// ao clicar em uma workspace
function selectWorkspace(w) {
    wrkselected = w
    setTimeout(function () {
        drawWorkspace(wrkselected)
        updateProjects(wrkselected).then(() => {
            drawProjects(wrkselected)
            setTimeout(function () {
                container.style.animation = 'none'
                tituloContainer.style.animation = 'none'

            }, 1400);
        })
    }, 600);

    container.style.animation = 'transicaoContainer 2s cubic-bezier(0.19, 1, 0.22, 1) .1s both'
    tituloContainer.style.animation = 'transicaoContainer 2s cubic-bezier(0.19, 1, 0.22, 1) .1s both'
}


function openDeleteWorkspace(w) {
    buttonConfirmDeleteWorkspace.innerHTML = `<button id="buttonConfirmDeleteWorkspace" onclick="confirmDeleteWorkspace(${w})">Deletar Workspace</button>`

    criarprojeto.style.display = `flex`
    deleteWorkspace.style.display = `flex`

    console.log(`[DEBBUG] Starting to deleting workspace id = ${w}`)
}

function confirmDeleteWorkspace(w) {
    fetch('/deleteWorkspace', {
        method: 'DELETE',
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "workToDelete": w })
    })
        .then(response => response.json())
        .then(resposta => {
            console.log(resposta.Message)
            alertMessage(resposta.Message)
            updateWorkspace().then(() => {
                selectWorkspace(workspaces[0].id)
                closeDeleteWorkspace()
            })
        })

}

function closeDeleteWorkspace() {
    hudproject = true
    closecreate()
}








// Projetos

function updateProjects(workspaces_id) {
    return fetch('/listProject', {
        method: 'POST',
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ workspaces_id })
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                window.location.href = './login.html'
                throw new Error('Failed to fetch projects');
            }
        })
        .then((info) => {
            projetos = info
        })
}

function vermais(idbotao) {

    criarprojeto.style.display = 'flex'
    vermaisContainer.style.display = 'flex'

    if (projetos[idbotao].date == null) {
        divstatus.style.display = 'none'
    }
    else {
        divstatus.style.display = 'block'
    }
    acoes.innerHTML = `<i class="bi bi-x-lg" onclick="fechar_vermais()"></i> <i class="bi bi-trash" onclick="deleteProject(${projetos[idbotao].id})"></i>`



    tituloproj.innerHTML = projetos[idbotao].name
    descproj.innerHTML = projetos[idbotao].description
    dataproj.innerHTML = projetos[idbotao].date

    hudproject = true
}

function createProject() {
    let name = document.getElementById('projectname').value
    let description = document.getElementById('projectdesc').value
    let datap = document.getElementById('projectdate').value

    let datap_dividida = datap.split('-')
    let date = `${datap_dividida[2]}/${datap_dividida[1]}/${datap_dividida[0]}`

    let workspaces_id = wrkselected

    fetch('/createProject', {
        method: 'POST',
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description, date, workspaces_id })
    })
        .then(response => {
            if (!response.ok) {
                return response.json()
                    .then(error => { throw new Error(error.err) });
            }
            return response.json();
        })
        .then(info => {
            updateProjects(workspaces_id)
            hudproject = true
            closecreate()
            document.getElementById('projectdate').value = ''
            document.getElementById('projectname').value = ''
            document.getElementById('projectdesc').value = ''
            setTimeout(() => { //timer to handle the delay of list projects
                drawProjects()
            }, 500);
        })
        .catch(err => {
            console.log(err)
            let txtnotificacao = document.getElementById('txtnotificacao')
            let divnotificacao = document.getElementById('divnotificacao')
            divnotificacao.style.display = 'flex'
            divnotificacao.style.animation = 'notificacaoanimacao 1.5s cubic-bezier(0.19, 1, 0.22, 1) .1s both'
            txtnotificacao.innerHTML = err

            hudproject = true
            closecreate()
            setTimeout(function () {

                divnotificacao.style.animation = 'notificacaoanimacaoinversa 3s cubic-bezier(0.19, 1, 0.22, 1) .1s both'

                setTimeout(function () {

                    divnotificacao.style.display = 'none'
                }, 3000)

            }, 5000);
        })
}

function deleteProject(i) {
    fetch('/deleteProject', {
        method: 'DELETE',
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ i })
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Failed to delete project');
            }
        })
        .then((info) => {
            updateProjects(wrkselected)
            setTimeout(() => {
                drawProjects()
                fechar_vermais()
            }, 250);
        })
}

function drawProjects() {
    container.innerHTML = ''

    for (let i = 0; i < projetos.length; i++) {
        for (let j = i + 1; j < projetos.length; j++) {
            if (getProjectData(i) < getProjectData(j)) {
                let temp = projetos[i]
                projetos[i] = projetos[j]
                projetos[j] = temp
            }
        }
    }


    for (i = projetos.length - 1; i >= 0; i--) {

        let newProject = document.createElement('div');
        newProject.className = 'projeto'
        newProject.id = projetos[i].id

        if (projetos[i].date == null) {
            newProject.innerHTML = `<h1>${projetos[i].name}</h1><p>${projetos[i].description}</p><div class="botoes"><button style="width:100%" onclick="vermais(${i})">Ver mais</button></div>`
        }
        else {
            newProject.innerHTML = `<h1>${projetos[i].name}</h1><p>${projetos[i].description}</p><div class="botoes"><button onclick="vermais(${i})">Ver mais</button><button onclick="projectdata(${i})">${projetos[i].date}</button></div>`
        }

        document.getElementById('container').appendChild(newProject)
    }

    let divadicionar = document.createElement('div')

    divadicionar.className = "addprojeto"
    divadicionar.id = "addprojeto"
    divadicionar.setAttribute('onclick', 'opencreateProject()')

    let iconeadicionar = document.createElement('i')
    iconeadicionar.className = "bi bi-plus-lg"

    document.getElementById('container').appendChild(divadicionar)
    document.getElementById('addprojeto').appendChild(iconeadicionar)

    if (projetos == '') {
        setTimeout(function () {
            container.style.display = 'flex'
            container.style.justifyContent = 'center'
            container.style.alignItems = 'center'
            addprojeto.style.border = 'none'
            addprojeto.style.flexDirection = 'column'
            addprojeto.style.opacity = '1'
            addprojeto.style.width = ' 700px'
            addprojeto.style.height = '160px'
            addprojeto.innerHTML = '<p>Não há nada aqui... que tal criar algum projeto?</p> <br> <i class="bi bi-plus-lg"></i>'
        }, 300)

    }
    else {
        container.style.display = 'grid'
        container.style.justifyContent = 'center'
        container.style.alignItems = 'start'
        addprojeto.style.border = 'dashed 2px var(--azul)'
        addprojeto.style.opacity = '.15'
        addprojeto.style.width = ' 90%'
        addprojeto.style.height = '250px'
    }
}

function getProjectData(i) {
    let data_atual = new Date()
    let dia_atual = data_atual.getDate()
    let mes_atual = data_atual.getMonth() + 1
    let ano_atual = data_atual.getFullYear()

    let dataprojeto = projetos[i].date
    if(dataprojeto == null) { return 1 }

    let splitdate = dataprojeto.split('/')



    for (j = 0; j < 3; j++) {
        splitdate[j] = parseInt(splitdate[j])
    }

    let soma_dias_atual = ano_atual * 365 + mes_atual * 31 + dia_atual
    let soma_dias_prazo = splitdate[2] * 365 + splitdate[1] * 31 + splitdate[0]
    let dias_restantes = soma_dias_prazo - soma_dias_atual

    return dias_restantes
}

function projectdata(i) {
    alertMessage(`Faltam <span> ${getProjectData(i)} </span> dias para o prazo de <span>${projetos[i].name}</span>.`)
}




function alertMessage(message) {
    let txtnotificacao = document.getElementById('txtnotificacao')
    let divnotificacao = document.getElementById('divnotificacao')
    divnotificacao.style.display = 'flex'
    divnotificacao.style.animation = 'notificacaoanimacao 1.5s cubic-bezier(0.19, 1, 0.22, 1) .1s both'

    txtnotificacao.innerHTML = `${message}`

    setTimeout(function () {

        divnotificacao.style.animation = 'notificacaoanimacaoinversa 3s cubic-bezier(0.19, 1, 0.22, 1) .1s both'

        setTimeout(function () {

            divnotificacao.style.display = 'none'
        }, 3000)

    }, 5000);
}




