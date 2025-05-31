let bodyMain = document.querySelector('main')

let createProjectsHeader = document.createElement('div')
createProjectsHeader.className = "divPartedecima"
bodyMain.appendChild(createProjectsHeader)

createProjectsHeader.innerHTML = `<h1 class="paginatitulo" id="tituloContainer" style="animation: auto ease 0s 1 normal none running none;">
                Carregando...</h1>
            <div id="iconDeletarWorkspace"></div>`


            
let createProjectsContainer = document.createElement('div')
createProjectsContainer.className = "container"
createProjectsContainer.id = "container"
bodyMain.appendChild(createProjectsContainer)

createProjectsContainer.innerHTML = `<div class="addprojeto" id="addprojeto" onclick="opencreateProject()">
                <i class="bi bi-plus-lg"></i>
            </div>`