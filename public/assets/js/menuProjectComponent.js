function opencreateProject() {
    openMenuShowUp()

    const createProjetoContainer = buildHudPanel('form', 'projetoContainer', `
        <h1>Defina seu novo projeto</h1>
        <div class="divnome">
            <h2>Nome do projeto</h2>
            <input type="text" id="projectname" name="projectname" maxlength="24" required>
        </div>
        <div class="divdesc">
            <h2>Descrição do projeto</h2>
            <textarea id="projectdesc" name="projectdesc" maxlength="130"></textarea>
        </div>
        <div class="divprazo">
            <h2>Prazo de conclusão</h2>
            <div class="divprazo2">
                <i class="bi bi-calendar-week"></i>
                <input type="date" id="projectdate" name="projectdate" class="projectdate">
            </div>
        </div>
        <button type="submit">Criar novo projeto</button>
    `)

    createProjetoContainer.addEventListener('submit', (event) => {
        event.preventDefault()
        createProject()
    })

    menuShowUp.setAttribute('onclick', 'closeCreateProject()')
}

function closeCreateProject() {
    closeHudPanelById('projetoContainer')
}

function openVermais() {
    buildHudPanel('div', 'vermaisContainer', `
        <div class="acoes" id="acoes"></div>
        <div class="infoproj">
            <h1 id="tituloproj">Carregando...</h1>
            <p id="descproj">Carregando...</p>
        </div>
        <div class="status" id="divstatus">
            <p>Prazo de conclusão</p>
            <div class="divprazoprojeto">
                <i class="bi bi-calendar-week"></i>
                <p id="dataproj">Carregando data...</p>
            </div>
        </div>
    `)

    menuShowUp.setAttribute('onclick', 'closeVermais()')
}

function fechar_vermais() {
    hudproject = true
    closeVermais()
}

function closeVermais() {
    closeHudPanelById('vermaisContainer')
}
