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

function opencreateProject(){
    if(!hudproject){
        criarprojeto.style.display = 'flex'
        projetoContainer.style.display = 'flex'
        
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
        projetoContainer.style.display = 'none'
        hudproject = false
        vermaisContainer.style.display = 'none'
    }
}

let tituloproj = document.getElementById('tituloproj')
let descproj = document.getElementById('descproj')


function vermais(idbotao){
    if(!hudproject){
        criarprojeto.style.display = 'flex'
        vermaisContainer.style.display = 'flex'
    }
    console.log('clicou em ver mais')
    console.log(idbotao)

    tituloproj.innerHTML = projetos[idbotao].nome
    descproj.innerHTML = projetos[idbotao].desc
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