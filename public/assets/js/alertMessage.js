function alertMessage(message) {
    let criarDivnNotificacao = document.createElement('div')
    criarDivnNotificacao.className = "divnotificacao"
    criarDivnNotificacao.id = "divnotificacao"
    criarDivnNotificacao.style = "display: none;"
    document.body.appendChild(criarDivnNotificacao)
    const notificacaoContainer = document.createElement('div')
    notificacaoContainer.className = 'notificacaocontainer'

    const txtnotificacao = document.createElement('h2')
    txtnotificacao.id = 'txtnotificacao'
    setSafeText(txtnotificacao, message)

    notificacaoContainer.appendChild(txtnotificacao)
    criarDivnNotificacao.appendChild(notificacaoContainer)

    criarDivnNotificacao.style.display = 'flex'
    criarDivnNotificacao.style.animation = 'notificacaoanimacao 1.5s cubic-bezier(0.19, 1, 0.22, 1) .1s both'


    setTimeout(function () {

        criarDivnNotificacao.style.animation = 'notificacaoanimacaoinversa 3s cubic-bezier(0.19, 1, 0.22, 1) .1s both'

        setTimeout(function () {

            criarDivnNotificacao.style.display = 'none'
            criarDivnNotificacao.remove()
        }, 3000)

    }, 5000);
}
