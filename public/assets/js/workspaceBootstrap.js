let bodySection = document.querySelector('section')

bodySection.innerHTML = `<div class="wContainer" id="wContainer">
        </div>
        <div class="addworkspace" onclick="addworkspace()">
            <p>Adicionar workspace</p>
        </div>`


wContainer = document.getElementById('wContainer')
iconDeletarWorkspace = document.getElementById('iconDeletarWorkspace')

updateWorkspace()
drawProjects()
