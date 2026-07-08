let bodySection = document.querySelector('section')
let bodyMain = document.querySelector('main')

function weeklytodoPageLoad() {
    let divnotificacao = document.getElementById('divnotificacao')

    if (divnotificacao != null) {
        divnotificacao.style.display = 'none'
    }

    if (bodySection) {
        bodySection.style.display = 'none'
    }

    let header = document.querySelector('header')
    if (header) {
        header.style.borderRight = '0px'
    }

    // Oculta os elementos da página de projetos, se existirem
    let projectsContainer = document.getElementById('container')
    let projectsHeader = document.querySelector('.divPartedecima')
    if (projectsContainer) {
        projectsContainer.style.display = 'none'
    }
    if (projectsHeader) {
        projectsHeader.style.display = 'none'
    }

    // Se o container de tarefas semanais já existir, apenas exibe-o
    let weeklyTasksContainer = document.getElementById('weeklyTasksContainer')
    if (!weeklyTasksContainer) {
        weeklyTasksContainer = document.createElement('div')
        weeklyTasksContainer.id = 'weeklyTasksContainer'
        weeklyTasksContainer.style.width = '100%'
        weeklyTasksContainer.style.display = 'flex'
        weeklyTasksContainer.style.flexDirection = 'column'
        weeklyTasksContainer.style.alignItems = 'center'
        weeklyTasksContainer.style.justifyContent = 'flex-start'

        weeklyTasksContainer.innerHTML = `
        <div id="tituloPrincipal">
            <h1>Tarefas semanais</h1>
        </div>
        <div id="camadaOpcoes">
            <button onclick="addNextWeek()">Adicionar próxima semana</button>
        </div>

        <div id="containerSemanas">
            <div class="semana">
                <div class="diaSemana" id="segunda">
                    <h2>Segunda</h2>
                </div>
                <div class="diaSemana" id="terça">
                    <h2>Terça</h2>
                </div>
                <div class="diaSemana" id="quarta">
                    <h2>Quarta</h2>
                </div>
                <div class="diaSemana" id="quinta">
                    <h2>Quinta</h2>
                </div>
                <div class="diaSemana" id="sexta">
                    <h2>Sexta</h2>
                </div>
                <div class="diaSemana" id="sabado">
                    <h2>Sábado</h2>
                    <div class="atividadeSemanal">
                        <input type="checkbox">
                        <p>aosdiajsodjasoidj</p>
                    </div>
                </div>
                <div class="diaSemana" id="domingo">
                    <h2>Domingo</h2>
                </div>
            </div>
        </div>`
        bodyMain.appendChild(weeklyTasksContainer)
    } else {
        weeklyTasksContainer.style.display = 'flex'
    }
}

function addNextWeek() {
    window.alert('Funcionalidade "Adicionar próxima semana" em desenvolvimento.')
}

weeklytodoPageLoad()
