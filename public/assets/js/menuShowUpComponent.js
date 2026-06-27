const menuShowUp = document.getElementById('menuShowUp')
let hudproject = false

const HUD_CLOSE_DELAY_MS = 700
const HUD_ANIMATION_OUT = 'opacidadeinversa 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'
const HUD_ANIMATION_IN = 'bluranimation 1s cubic-bezier(0.19, 1, 0.22, 1) .1s both'

addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'Escape':
            hudproject = true
            menuShowUp.onclick()
            break;

        default:
            break;
    }
})

function openMenuShowUp() {
    menuShowUp.style.display = 'flex'
}

function closeMenu() {
    if (hudproject) {
        menuShowUp.style.animation = HUD_ANIMATION_OUT

        // "timer" para que esses códigos apenas sejam rodados depois de acabar a animacao anterior
        setTimeout(function () {
            hudproject = false
            menuShowUp.style.display = 'none'
            menuShowUp.style.animation = HUD_ANIMATION_IN
        }, HUD_CLOSE_DELAY_MS)
    }
}

function outcreatehud() {
    hudproject = true
}

function overcreatehud() {
    hudproject = false
}
