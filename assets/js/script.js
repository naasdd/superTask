let estilo = document.getElementById('stylesheet')
let titulo = document.getElementById('titulopag')
let iconelogo = document.getElementById('iconelogo')
let titulosupertask = document.getElementById('superTask')


function projects(){
    estilo.href = './assets/css/projetos.css'
    titulo.innerHTML = 'Projetos'
    iconelogo.remove()
    titulosupertask.remove()
    drawProjects()
}



// =========================
// Parte PROJETOS
// =========================

let workspaces = ['teste0']

let projetos = []
let projetos0 = []
let projetos1 = ['teste']
let projetos2 = []
let projetos3 = []
let projetos4 = []
let pjPlaceholder = []

let projectname = ''
let projectdesc = ''
let projectdate = ''
let criarprojeto = document.getElementById('criarProjeto')
let projetoContainer = document.getElementById('projetoContainer')
let vermaisContainer = document.getElementById('vermaisContainer')
let hudproject = false
let container = document.getElementById('container')
let wContainer = document.getElementById('wContainer')



function addworkspace(){
    if(workspaces.length >= 5){
        window.alert('Você não pode criar mais que 5 workspaces')
    }
    else{
        workspaces.push('teste' + workspaces.length)
        drawWorkspace()
    }
}
function drawWorkspace(){
    wContainer.innerHTML = ''
    for(i = 0; i < workspaces.length; i++){
        console.log(workspaces[i])
        wContainer.innerHTML += `<div class="workspace" id="work${i}" onclick="selectWorkspace(${i})">${workspaces[i]}</div>` 
    }
}

function selectWorkspace(w){
    console.log('clicou' + w)

    switch (w) {
        case w = 0:
          pjPlaceholder = projetos0
          break;
        case w = 1:
          pjPlaceholder = projetos1
          console.log('era pra coisar')
          break;
        case w = 2:
          pjPlaceholder = projetos3
          break;
        case w = 3:
          pjPlaceholder = projetos3
          break;
        case w = 4:
          pjPlaceholder = projetos4
          break;
    }
          projetos = pjPlaceholder

    drawProjects()

}


function opencreateProject(){
        criarprojeto.style.display = 'flex'
        projetoContainer.style.display = 'flex'
        
}
function outcreatehud(){
    hudproject = true
}

function overcreatehud(){
    hudproject = false
}
function closecreate(){
    if(hudproject){
        criarprojeto.style.animation = 'opacidadeinversa 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'
        projetoContainer.style.animation = 'opacidadeinversa 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'
        vermaisContainer.style.animation = 'opacidadeinversa 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'
        
        
        // "timer" para que esses códigos apenas sejam rodados depois de acabar a animacao anterior
        setTimeout(function() {
            hudproject = false

            criarprojeto.style.display = 'none';
            projetoContainer.style.display = 'none';
            vermaisContainer.style.display = 'none';

            criarprojeto.style.animation = 'bluranimation 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'
        projetoContainer.style.animation = 'bluranimation 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'
        vermaisContainer.style.animation = 'bluranimation 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'

        }, 700);  //tempo em ms
    }
}



let tituloproj = document.getElementById('tituloproj')
let descproj = document.getElementById('descproj')
let dataproj = document.getElementById('dataproj')
let acoes = document.getElementById('acoes')
let divstatus = document.getElementById('divstatus')

function vermais(idbotao){

    criarprojeto.style.display = 'flex'
    vermaisContainer.style.display = 'flex'
    
    console.log('clicou em ver mais')
    console.log(`button id is  ${idbotao}`)

    if(projetos[idbotao].date == 'undefined/undefined/'){
        divstatus.style.display = 'none'
    }
    else{
        divstatus.style.display = 'block'
    }

    acoes.innerHTML = `<i class="bi bi-x-lg" onclick="fechar_vermais()"></i> <i class="bi bi-trash" onclick="deleteProject(${idbotao})"></i>`
    tituloproj.innerHTML = projetos[idbotao].nome
    descproj.innerHTML = projetos[idbotao].desc
    dataproj.innerHTML = projetos[idbotao].date
    hudproject = true
}

function fechar_vermais(){
    hudproject = true
    closecreate()
}




function createProject(){
    titulo = document.getElementById('projectname').value
    desc = document.getElementById('projectdesc').value
    datap = document.getElementById('projectdate').value

    let datap_dividida = datap.split('-')
    let datap_formatada = `${datap_dividida[2]}/${datap_dividida[1]}/${datap_dividida[0]}`

    projetos.push({
        nome: titulo,
        desc: desc,
        date: datap_formatada
    });





    drawProjects()
    hudproject = true
    closecreate()
}

function deleteProject(i){
    console.log(projetos)
    projetos.pop(i)
    console.log(projetos)

    drawProjects()
    fechar_vermais()
}


function drawProjects(){
    container.innerHTML = ''

    for(i= projetos.length-1; i >= 0; i--){

        let newProject = document.createElement('div');
        newProject.className = 'projeto'
        newProject.id = 'projeto' + i

        if(projetos[i].date == 'undefined/undefined/'){
            newProject.innerHTML = `<h1>${projetos[i].nome}</h1><p>${projetos[i].desc}</p><div class="porcentagem"></div><div class="botoes"><button style="width:100%" onclick="vermais(${i})">Ver mais</button></div>`
        }
        else{
            newProject.innerHTML = `<h1>${projetos[i].nome}</h1><p>${projetos[i].desc}</p><div class="porcentagem"></div><div class="botoes"><button onclick="vermais(${i})">Ver mais</button><button onclick="projectdata(${i})">${projetos[i].date}</button></div>`
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


    if(projetos == ''){
        console.log('vazio')
        setTimeout(function(){
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
    else{
        container.style.display = 'grid'
        container.style.justifyContent = 'center'
        container.style.alignItems = 'start'
        addprojeto.style.border = 'dashed 2px var(--azul)'
        addprojeto.style.opacity = '.15'
        addprojeto.style.width = ' 90%'
        addprojeto.style.height = '260px'
    }
}


function projectdata(i){

    let txtnotificacao = document.getElementById('txtnotificacao')
    let divnotificacao = document.getElementById('divnotificacao')
    divnotificacao.style.display = 'flex'
    divnotificacao.style.animation = 'notificacaoanimacao 1.5s cubic-bezier(0.19, 1, 0.22, 1) .1s both'

    let data_atual = new Date()
    let dia_atual = data_atual.getDate()
    let mes_atual = data_atual.getMonth() + 1
    let ano_atual = data_atual.getFullYear()

    let dataprojeto = projetos[i].date
    let splitdate = dataprojeto.split('/')

    for(j = 0; j < 3; j++){
        splitdate[j] = parseInt(splitdate[j])
    }

    let soma_dias_atual = ano_atual*365 + mes_atual*31 + dia_atual
    let soma_dias_prazo = splitdate[2]*365 + splitdate[1]*31 + splitdate[0]
    let dias_restantes = soma_dias_prazo - soma_dias_atual

    txtnotificacao.innerHTML = `Faltam <span> ${dias_restantes} </span> dias para o prazo de <span>${projetos[i].nome}</span>.`

    setTimeout(function() {

        divnotificacao.style.animation = 'notificacaoanimacaoinversa 3s cubic-bezier(0.19, 1, 0.22, 1) .1s both'

        setTimeout(function(){

            divnotificacao.style.display = 'none'
        }, 3000)
            
    }, 5000); 
}

    console.log('versão 1.1.0')


drawWorkspace()