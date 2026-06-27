const bodyHeader = document.querySelector('header')

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
            </div>
        <div class="webInfo">       
            <i class="bi bi-info-circle" onclick="openWebsiteInfo()"></i>
        </div>`
