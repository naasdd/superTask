let estilo = document.getElementById('stylesheet')
let titulo = document.getElementById('titulopag')
let iconelogo = document.getElementById('iconelogo')
let titulosupertask = document.getElementById('superTask')


function projects(){
    estilo.href = './assets/css/projetos.css'
    titulo.innerHTML = 'Projetos'
    iconelogo.remove()
    titulosupertask.remove()
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


    drawProjects()
    hudproject = true
    closecreate()
}


function drawProjects(){
    container.innerHTML = ''


    for(i= projetos.length-1; i >= 0; i--){

        let newProject = document.createElement('div');
        newProject.className = 'projeto'
        newProject.id = 'projeto' + i
        newProject.innerHTML = `<h1>${projetos[i].nome}</h1><p>${projetos[i].desc}</p><div class="porcentagem"></div><div class="botoes"><button onclick="vermais(${i})">Ver mais</button><button onclick="projectdata(${i})">${projetos[i].date}</button></div>`

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


function projectdata(i){
    console.log(i)
    console.log(projetos[i].date)

    let txtnotificacao = document.getElementById('txtnotificacao')

    txtnotificacao.innerHTML = `Faltam <span> X </span> dias para o prazo de <span>${projetos[i].nome}</span>.`

    let divnotificacao = document.getElementById('divnotificacao')
    divnotificacao.style.display = 'flex'
    divnotificacao.style.animation = 'notificacaoanimacao 1.5s cubic-bezier(0.19, 1, 0.22, 1) .1s both'

    let data_atual = new Date()
    let dia_atual = data_atual.getDate()
    let mes_atual = data_atual.getMonth()
    let ano_atual = data_atual.getFullYear()

    console.log(`${dia_atual}, ${mes_atual}, ${ano_atual}`)

    let dataprojeto = projetos[i].date
    let splitdate = dataprojeto.split('-')
    console.log(splitdate)

    for(i = 0; i < 3; i++){
        splitdate[i] = parseInt(splitdate[i])
    }
    console.log(splitdate)

    let soma_dias_atual = ano_atual*365 + mes_atual*31 + dia_atual
    console.log(soma_dias_atual)
    let soma_dias_prazo = splitdate[0]*365 + splitdate[1]*31 + splitdate[2]
    console.log(`Dias restantes: ${soma_dias_prazo - soma_dias_atual}`)




    setTimeout(function() {

        console.log('animacao inversa')

        divnotificacao.style.animation = 'notificacaoanimacaoinversa 3s cubic-bezier(0.19, 1, 0.22, 1) .1s both'

        setTimeout(function(){

            divnotificacao.style.display = 'none'
            console.log('display none')
        }, 3000)
            
    }, 5000); 
}





let newProject = document.createElement('div');
projetos.push({
    nome: 'Volta as aulas',
    desc: 'Descrição para teste de projeto do superTask para com que eu tenha melhor visibildade e controle no desenvolvimento da aplicação.',
    date: '2024-02-05'
})

    drawProjects()

    console.log('versão 27/01/2024 alogritmo ainda nao esta pronto')