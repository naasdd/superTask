function fechar_vermais() {
    hudproject = true
    closecreate()
}

function opencreateProject() {
    criarprojeto.style.display = 'flex'
    projetoContainer.style.display = 'flex'

}

function outcreatehud() {
    hudproject = true
}

function overcreatehud() {
    hudproject = false
}

function closecreate() {
    if (hudproject) {
        criarprojeto.style.animation = 'opacidadeinversa 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'
        projetoContainer.style.animation = 'opacidadeinversa 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'
        vermaisContainer.style.animation = 'opacidadeinversa 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'
        createWorkspace.style.animation = 'opacidadeinversa 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'



        // "timer" para que esses códigos apenas sejam rodados depois de acabar a animacao anterior
        setTimeout(function () {
            hudproject = false

            criarprojeto.style.display = 'none';
            projetoContainer.style.display = 'none';
            vermaisContainer.style.display = 'none';
            createWorkspace.style.display = 'none'

            criarprojeto.style.animation = 'bluranimation 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'
            projetoContainer.style.animation = 'bluranimation 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'
            vermaisContainer.style.animation = 'bluranimation 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'
            createWorkspace.style.animation = 'bluranimation 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'

        }, 700);
    }
}

function opencreateWorkspace() {
    criarprojeto.style.display = 'flex'
    createWorkspace.style.display = 'flex'
}