function alertMessage(message) {
    let criarDivnNotificacao = document.createElement('div')
    criarDivnNotificacao.className = "divnotificacao"
    criarDivnNotificacao.id = "divnotificacao"
    criarDivnNotificacao.style = "display: none;"
    document.body.appendChild(criarDivnNotificacao)
    criarDivnNotificacao.innerHTML = `<div class="notificacaocontainer">
            <h2 id="txtnotificacao">Faltam X dias para o prazo de XXXXXXX!</h2>
        </div>`

    let txtnotificacao = document.getElementById('txtnotificacao')
    let divnotificacao = document.getElementById('divnotificacao')

    divnotificacao.style.display = 'flex'
    divnotificacao.style.animation = 'notificacaoanimacao 1.5s cubic-bezier(0.19, 1, 0.22, 1) .1s both'

    txtnotificacao.innerHTML = `${message}`

    setTimeout(function () {

        divnotificacao.style.animation = 'notificacaoanimacaoinversa 3s cubic-bezier(0.19, 1, 0.22, 1) .1s both'

        setTimeout(function () {

            divnotificacao.style.display = 'none'
            criarDivnNotificacao.remove()
        }, 3000)

    }, 5000);
}