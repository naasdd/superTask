let estilo = document.getElementById('stylesheet')
let titulo = document.getElementById('titulopag')
let iconelogo = document.getElementById('iconelogo')
let titulosupertask = document.getElementById('superTask')

// let srcscript = document.getElementById('scriptpagina')

function projects(){
    estilo.href = './assets/css/projetos.css'
    titulo.innerHTML = 'Projetos'
    iconelogo.remove()
    titulosupertask.remove()
    // srcscript.src = "./assets/js/projetos.js"
}



// =========================
// Parte PROJETOS
// =========================

let projetos = [];
let projectname = ''
let projectdesc = ''
let projectdate = ''
let criarprojeto = document.getElementById('criarProjeto')
let projetoContainer = document.getElementById('projetoContainer')
let vermaisContainer = document.getElementById('vermaisContainer')
let hudproject = false
let container = document.getElementById('container')

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


function vermais(idbotao){

    criarprojeto.style.display = 'flex'
    vermaisContainer.style.display = 'flex'
    
    console.log('clicou em ver mais')
    console.log(`button id is  ${idbotao}`)

    tituloproj.innerHTML = projetos[idbotao].nome
    descproj.innerHTML = projetos[idbotao].desc
    hudproject = true
}




function createProject(){
    let newProject = document.createElement('div');
    titulo = document.getElementById('projectname').value
    desc = document.getElementById('projectdesc').value
    datep = document.getElementById('projectdate').value

    projetos.push({
        nome: titulo,
        desc: desc,
        date: datep
    });

    newProject.className = 'projeto'
    newProject.id = 'projeto' + projetos.length
    newProject.innerHTML = `<h1>${projetos[projetos.length - 1].nome}</h1><p>${projetos[projetos.length - 1].desc}</p><div class="porcentagem"></div><div class="botoes"><button onclick="vermais(${projetos.length - 1})">Ver mais</button><button>${projetos[projetos.length - 1].date}</button></div>`

    document.getElementById('container').appendChild(newProject)

    drawProjects()
}


function drawProjects(){
    container.innerHTML = ''


    for(i= projetos.length-1; i >= 0; i--){

        let newProject = document.createElement('div');
        newProject.className = 'projeto'
        newProject.id = 'projeto' + i
        newProject.innerHTML = `<h1>${projetos[i].nome}</h1><p>${projetos[i].desc}</p><div class="porcentagem"></div><div class="botoes"><button onclick="vermais(${i})">Ver mais</button><button>${projetos[i].date}</button></div>`

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
}




let newProject = document.createElement('div');
projetos.push({
    nome: 'Título de teste',
    desc: 'Descrição para teste de projeto do superTask para com que eu tenha melhor visibildade e controle no desenvolvimento da aplicação.',
    date: '20/12/2023'
})
newProject.className = 'projeto'
    newProject.id = 'projeto' + projetos.length
    newProject.innerHTML = `<h1>${projetos[projetos.length - 1].nome}</h1><p>${projetos[projetos.length - 1].desc}</p><div class="porcentagem"></div><div class="botoes"><button onclick="vermais(${projetos.length - 1})">Ver mais</button><button>${projetos[projetos.length - 1].date}</button></div>`

    document.getElementById('container').appendChild(newProject)

    drawProjects()