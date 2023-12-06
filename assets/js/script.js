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
let criarprojeto = document.getElementById('criarProjeto')
let hudproject = false

function opencreateProject(){
    if(!hudproject){
        criarprojeto.style.display = 'flex'
    }
}
function outcreatehud(){
    hudproject = true
}

function overcreatehud(){
    hudproject = false
}
function closecreate(){
    if(hudproject){
        criarprojeto.style.display = 'none'
        hudproject = false
    }
}

function createProject(){
    let newProject = document.createElement('div');
    titulo = document.getElementById('projectname').value
    desc = document.getElementById('projectdesc').value

    projetos.push({
        nome: titulo,
        desc: desc
    });

    newProject.className = 'projeto'
    newProject.id = 'projeto' + projetos.length
    newProject.innerHTML = `<h1>${projetos[projetos.length - 1].nome}</h1><p>${projetos[projetos.length - 1].desc}</p><div class="porcentagem"></div><div class="botoes"><button>Ver mais</button><button>06/12/2023</button></div>`

    document.getElementById('container').appendChild(newProject)
}