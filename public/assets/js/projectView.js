let container = document.getElementById('container')
let tituloContainer = document.getElementById('tituloContainer')

function vermais(idbotao) {
    openMenuShowUp()
    openVermais()

    const tituloproj = document.getElementById('tituloproj')
    const descproj = document.getElementById('descproj')
    const dataproj = document.getElementById('dataproj')
    const acoes = document.getElementById('acoes')
    const divstatus = document.getElementById('divstatus')
    const vermaisContainer = document.getElementById('vermaisContainer')


    vermaisContainer.style.display = 'flex'

    if (projetos[idbotao].date == null) {
        divstatus.style.display = 'none'
    }
    else {
        divstatus.style.display = 'block'
    }
    acoes.textContent = ''

    const closeIcon = document.createElement('i')
    closeIcon.className = 'bi bi-x-lg'
    closeIcon.addEventListener('click', fechar_vermais)

    const deleteIcon = document.createElement('i')
    deleteIcon.className = 'bi bi-trash'
    deleteIcon.addEventListener('click', () => deleteProject(projetos[idbotao].id))

    acoes.appendChild(closeIcon)
    acoes.appendChild(deleteIcon)

    setSafeText(tituloproj, projetos[idbotao].name)
    setSafeText(descproj, projetos[idbotao].description)
    setSafeText(dataproj, projetos[idbotao].date)

    hudproject = true
}

function drawProjects() {
    container.textContent = ''

    //Ordena array de projetos com base na quantidade de dias restantes
    for (let i = 0; i < projetos.length; i++) {
        for (let j = i + 1; j < projetos.length; j++) {
            if (getProjectData(i) < getProjectData(j)) {
                const temp = projetos[i]
                projetos[i] = projetos[j]
                projetos[j] = temp
            }
        }
    }


    //Desenha na tela cada projeto
    for (let i = projetos.length - 1; i >= 0; i--) {

        const newProject = document.createElement('div')
        newProject.className = 'projeto'
        newProject.id = projetos[i].id

        const title = document.createElement('h1')
        setSafeText(title, projetos[i].name)

        const description = document.createElement('p')
        setSafeText(description, projetos[i].description)

        const buttons = document.createElement('div')
        buttons.className = 'botoes'

        const verMaisButton = document.createElement('button')
        setSafeText(verMaisButton, 'Ver mais')
        verMaisButton.addEventListener('click', () => vermais(i))

        buttons.appendChild(verMaisButton)

        if (projetos[i].date == null) {
            verMaisButton.style.width = '100%'
        }
        else {
            const dateButton = document.createElement('button')
            setSafeText(dateButton, projetos[i].date)
            dateButton.addEventListener('click', () => projectdata(i))
            buttons.appendChild(dateButton)
        }

        newProject.appendChild(title)
        newProject.appendChild(description)
        newProject.appendChild(buttons)

        document.getElementById('container').appendChild(newProject)
    }


    //Após desenhar ultimo projeto, adiciona botao de adicionar projeto
    const divadicionar = document.createElement('div')

    divadicionar.className = 'addprojeto'
    divadicionar.id = 'addprojeto'
    divadicionar.setAttribute('onclick', 'opencreateProject()')

    const iconeadicionar = document.createElement('i')
    iconeadicionar.className = 'bi bi-plus-lg'

    document.getElementById('container').appendChild(divadicionar)
    const addProjeto = document.getElementById('addprojeto')
    addProjeto.appendChild(iconeadicionar)

    if (projetos.length === 0) {
        setTimeout(function () {
            container.style.display = 'flex'
            container.style.justifyContent = 'center'
            container.style.alignItems = 'center'
            addProjeto.style.border = 'none'
            addProjeto.style.flexDirection = 'column'
            addProjeto.style.opacity = '1'
            addProjeto.style.width = ' 700px'
            addProjeto.style.height = '160px'
            addProjeto.textContent = ''

            const emptyMessage = document.createElement('p')
            setSafeText(emptyMessage, 'Não há nada aqui... que tal criar algum projeto?')

            const emptyIcon = document.createElement('i')
            emptyIcon.className = 'bi bi-plus-lg'

            addProjeto.appendChild(emptyMessage)
            addProjeto.appendChild(document.createElement('br'))
            addProjeto.appendChild(emptyIcon)
        }, 300)

    }
    else {
        container.style.display = 'grid'
        container.style.justifyContent = 'center'
        container.style.alignItems = 'start'
        addProjeto.style.border = 'dashed 2px var(--azul)'
        addProjeto.style.opacity = '.15'
        addProjeto.style.width = ' 90%'
        addProjeto.style.height = '250px'
    }
}

function getProjectData(i) {
    const data_atual = new Date()
    const dia_atual = data_atual.getDate()
    const mes_atual = data_atual.getMonth() + 1
    const ano_atual = data_atual.getFullYear()

    const dataprojeto = projetos[i].date
    if (dataprojeto == null) { return 1 }

    const splitdate = dataprojeto.split('/')

    for (let j = 0; j < 3; j++) {
        splitdate[j] = parseInt(splitdate[j])
    }

    const soma_dias_atual = ano_atual * 365 + mes_atual * 31 + dia_atual
    const soma_dias_prazo = splitdate[2] * 365 + splitdate[1] * 31 + splitdate[0]
    const dias_restantes = soma_dias_prazo - soma_dias_atual

    return dias_restantes
}

function projectdata(i) {
    const getProjectDataResultado = getProjectData(i)

    if (getProjectDataResultado >= 1) {
        alertMessage(`Faltam ${getProjectDataResultado} dias para o prazo de ${projetos[i].name}.`)
    }
    else if (getProjectDataResultado == 0) {
        alertMessage(`Hoje é o prazo de ${projetos[i].name}.`)
    }
    else if (getProjectDataResultado <= -1) {
        alertMessage(`Você está a ${getProjectDataResultado} dias atrasado para o prazo de ${projetos[i].name}.`)
    }
}

function fechar_vermais() {
    hudproject = true
    closeVermais()
}
