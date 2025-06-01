let bodySection = document.querySelector('section')

bodySection.innerHTML = `<div class="wContainer" id="wContainer">
        </div>
        <div class="addworkspace" onclick="addworkspace()">
            <p>Adicionar workspace</p>
        </div>`


let wContainer = document.getElementById('wContainer')

let createWorkspace = document.getElementById('createWorkspace')

let iconDeletarWorkspace = document.getElementById('iconDeletarWorkspace')
let deleteWorkspace = document.getElementById('deleteWorkspace')
let buttonConfirmDeleteWorkspace = document.getElementById('buttonConfirmDeleteWorkspace')

let workspaces = []

let wrkselected = 0


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
            console.log(info)
            if (info.Error == "Invalid input") {
                alertMessage(`Não foi possível criar workspace, ${info.Error}`)
                hudproject = true
                closeCreateWorkspace()
            }
            else{
                updateWorkspace()
                document.getElementById('workspaceName').value = ''
                setTimeout(() => {
                    const workspaces_id = info.creating.id
                    drawWorkspace()
                    hudproject = true
                    closeCreateWorkspace()
                    selectWorkspace(workspaces_id)
                }, 200);
            }
        })
}



// para posicionar as workspace's na sidebar
function drawWorkspace(wrkselected) {
    wContainer.innerHTML = ''

    for (let i = 0; i < workspaces.length; i++) {
        if (wrkselected == workspaces[i].id) {
            tituloContainer.innerHTML = workspaces[i].workspaceName
            titulo.innerHTML = `${workspaces[i].workspaceName} | Super Task`
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
            alertMessage(resposta.Message)
            updateWorkspace().then(() => {
                selectWorkspace(workspaces[0].id)
                hudproject = true
                closeDeleteWorkspace()
            })
        })

}