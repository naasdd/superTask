function buildHudPanel(tagName, id, staticMarkup) {
    const panel = document.createElement(tagName)
    panel.id = id
    panel.style.display = 'flex'
    panel.setAttribute('onmouseover', 'overcreatehud()')
    panel.setAttribute('onmouseout', 'outcreatehud()')
    panel.innerHTML = staticMarkup
    menuShowUp.appendChild(panel)
    return panel
}

function closeHudPanelById(panelId) {
    const panel = document.getElementById(panelId)

    if (hudproject && panel) {
        menuShowUp.style.animation = HUD_ANIMATION_OUT
        panel.style.animation = HUD_ANIMATION_OUT

        menuShowUp.setAttribute('onclick', 'closeMenu()')

        // "timer" para que esses códigos apenas sejam rodados depois de acabar a animacao anterior
        setTimeout(function () {
            hudproject = false

            menuShowUp.style.display = 'none'
            panel.style.display = 'none'

            menuShowUp.style.animation = HUD_ANIMATION_IN
            panel.style.animation = HUD_ANIMATION_IN

            panel.remove()
        }, HUD_CLOSE_DELAY_MS)
    }
}
