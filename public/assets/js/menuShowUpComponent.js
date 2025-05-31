let menuShowUp = document.getElementById('menuShowUp')


function openMenuShowUp() {
    menuShowUp.style.display = 'flex'
}

function closeMenu() {
    if (hudproject) {
        menuShowUp.style.animation = 'opacidadeinversa 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'


        // "timer" para que esses códigos apenas sejam rodados depois de acabar a animacao anterior
        setTimeout(function () {
            hudproject = false

            menuShowUp.style.display = 'none';

            menuShowUp.style.animation = 'bluranimation 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'

        }, 700);
    }
}



function outcreatehud() {
    hudproject = true
}

function overcreatehud() {
    hudproject = false
}





function opencreateProject() {
    openMenuShowUp()

    let createProjetoContainer = document.createElement('form')
    createProjetoContainer.id = "projetoContainer"
    createProjetoContainer.setAttribute('onmouseover', 'overcreatehud()')
    createProjetoContainer.setAttribute('onmouseout', 'outcreatehud()')
    createProjetoContainer.setAttribute('onsubmit', 'createProject(); return false;')

    createProjetoContainer.style.display = 'flex'

    menuShowUp.appendChild(createProjetoContainer)

    createProjetoContainer.innerHTML = ` <h1>Defina seu novo projeto</h1>

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

                <button type="submit">Criar novo projeto</button>`


    menuShowUp.setAttribute('onclick', 'closeCreateProject()')
}

function closeCreateProject() {
    let projetoContainer = document.getElementById('projetoContainer')

    if (hudproject) {
        menuShowUp.style.animation = 'opacidadeinversa 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'
        projetoContainer.style.animation = 'opacidadeinversa 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'

        menuShowUp.setAttribute('onclick', 'closeMenu()')

        // "timer" para que esses códigos apenas sejam rodados depois de acabar a animacao anterior
        setTimeout(function () {
            hudproject = false


            menuShowUp.style.display = 'none';
            projetoContainer.style.display = 'none'

            menuShowUp.style.animation = 'bluranimation 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'
            projetoContainer.style.animation = 'bluranimation 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'

            projetoContainer.remove()
        }, 700);
    }
}










function opencreateWorkspace() {
    openMenuShowUp()
    let createCreateWorkspace = document.createElement('form')
    createCreateWorkspace.id = "createWorkspace"
    createCreateWorkspace.setAttribute('onmouseover', 'overcreatehud()')
    createCreateWorkspace.setAttribute('onmouseout', 'outcreatehud()')
    createCreateWorkspace.setAttribute('onsubmit', 'confirmCreateWorkspace(); return false;')

    createCreateWorkspace.style.display = 'flex'

    menuShowUp.appendChild(createCreateWorkspace)
    createCreateWorkspace.style.display = 'flex'

    createCreateWorkspace.innerHTML = `<h1>Criar nova workspace</h1>
                <p>Nome desejado:</p>
                <input type="text" id="workspaceName" required>
                <button type="submit">Criar nova workspace</button>`

    menuShowUp.setAttribute('onclick', 'closeCreateWorkspace()')

}

function closeCreateWorkspace() {
    let createWorkspace = document.getElementById('createWorkspace')

    if (hudproject) {
        menuShowUp.style.animation = 'opacidadeinversa 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'
        createWorkspace.style.animation = 'opacidadeinversa 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'

        menuShowUp.setAttribute('onclick', 'closeMenu()')

        // "timer" para que esses códigos apenas sejam rodados depois de acabar a animacao anterior
        setTimeout(function () {
            hudproject = false


            menuShowUp.style.display = 'none';
            createWorkspace.style.display = 'none'

            menuShowUp.style.animation = 'bluranimation 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'
            createWorkspace.style.animation = 'bluranimation 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'

            createWorkspace.remove()
        }, 700);
    }
}









function openDeleteWorkspace(w) {
    openMenuShowUp()
    let createDeleteWorkspace = document.createElement('form')
    createDeleteWorkspace.id = "deleteWorkspace"
    createDeleteWorkspace.setAttribute('onmouseover', 'overcreatehud()')
    createDeleteWorkspace.setAttribute('onmouseout', 'outcreatehud()')
    createDeleteWorkspace.setAttribute('onsubmit', `confirmDeleteWorkspace(${w}); return false;`)

    createDeleteWorkspace.style.display = 'flex'

    menuShowUp.appendChild(createDeleteWorkspace)
    createDeleteWorkspace.style.display = 'flex'

    createDeleteWorkspace.innerHTML = `<h1>Deletar workspace?</h1>
                <div id="buttonConfirmDeleteWorkspace"></div>
                <button onclick="hudproject = true; closeDeleteWorkspace(); return false;">Cancelar</button>`

    menuShowUp.setAttribute('onclick', 'closeDeleteWorkspace()')
    let buttonConfirmDeleteWorkspace = document.getElementById('buttonConfirmDeleteWorkspace')
    buttonConfirmDeleteWorkspace.innerHTML = `<button type="submit" id="buttonConfirmDeleteWorkspace">Deletar Workspace</button>`
}

function closeDeleteWorkspace() {
    let deleteWorkspace = document.getElementById('deleteWorkspace')

    if (hudproject) {
        menuShowUp.style.animation = 'opacidadeinversa 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'
        deleteWorkspace.style.animation = 'opacidadeinversa 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'

        menuShowUp.setAttribute('onclick', 'closeMenu()')

        // "timer" para que esses códigos apenas sejam rodados depois de acabar a animacao anterior
        setTimeout(function () {
            hudproject = false


            menuShowUp.style.display = 'none';
            deleteWorkspace.style.display = 'none'

            menuShowUp.style.animation = 'bluranimation 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'
            deleteWorkspace.style.animation = 'bluranimation 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'

            deleteWorkspace.remove()
        }, 700);
    }

}






function openVermais() {
    let createVerMaisContainer = document.createElement('div')
    createVerMaisContainer.id = "vermaisContainer"
    createVerMaisContainer.setAttribute('onmouseover', 'overcreatehud()')
    createVerMaisContainer.setAttribute('onmouseout', 'outcreatehud()')

    menuShowUp.appendChild(createVerMaisContainer)

    createVerMaisContainer.innerHTML = `<div class="acoes" id="acoes">
                </div>

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
                </div>`

    menuShowUp.setAttribute('onclick', 'closeVermais()')
}

function fechar_vermais() {
    hudproject = true
    closeVermais()
}

function closeVermais() {
    if (hudproject) {
        menuShowUp.style.animation = 'opacidadeinversa 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'
        vermaisContainer.style.animation = 'opacidadeinversa 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'

        menuShowUp.setAttribute('onclick', 'closeMenu()')

        // "timer" para que esses códigos apenas sejam rodados depois de acabar a animacao anterior
        setTimeout(function () {
            hudproject = false


            menuShowUp.style.display = 'none';
            vermaisContainer.style.display = 'none'

            menuShowUp.style.animation = 'bluranimation 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'
            vermaisContainer.style.animation = 'bluranimation 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'

            vermaisContainer.remove()
        }, 700);
    }
}