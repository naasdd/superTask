let projetos = []

let projectname = ''
let projectdesc = ''
let projectdate = ''
let projetoContainer = document.getElementById('projetoContainer')
let container = document.getElementById('container')

let tituloContainer = document.getElementById('tituloContainer')

let hudproject = false




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
    openMenuShowUp()
    openVermais()

    let tituloproj = document.getElementById('tituloproj')
    let descproj = document.getElementById('descproj')
    let dataproj = document.getElementById('dataproj')
    let acoes = document.getElementById('acoes')
    let divstatus = document.getElementById('divstatus')
    let vermaisContainer = document.getElementById('vermaisContainer')


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
            closeCreateProject()
            document.getElementById('projectdate').value = ''
            document.getElementById('projectname').value = ''
            document.getElementById('projectdesc').value = ''
            setTimeout(() => { //timer to handle the delay of list projects
                drawProjects()
            }, 500);
        })
        .catch(err => {
            alertMessage(`Não foi possível criar projeto, ${err}`)
            hudproject = true
            closeCreateProject()
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

    //Ordena array de projetos com base na quantidade de dias restantes
    for (let i = 0; i < projetos.length; i++) {
        for (let j = i + 1; j < projetos.length; j++) {
            if (getProjectData(i) < getProjectData(j)) {
                let temp = projetos[i]
                projetos[i] = projetos[j]
                projetos[j] = temp
            }
        }
    }


    //Desenha na tela cada projeto
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


    //Após desenhar ultimo projeto, adiciona botao de adicionar projeto
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
    if (dataprojeto == null) { return 1 }

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