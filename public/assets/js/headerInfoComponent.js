function openWebsiteInfo() {
    openMenuShowUp()

    const webSiteInfo = buildHudPanel('div', 'webSiteInfo', `
        <h1>Feito por José Gabriel</h1>
        <button type="button" id="githubButton">Ver github</button>
        <button type="button" id="closeWebsiteInfoButton">Cancelar</button>
    `)

    webSiteInfo.querySelector('#githubButton').addEventListener('click', vergithub)
    webSiteInfo.querySelector('#closeWebsiteInfoButton').addEventListener('click', fechar_websiteInfo)

    menuShowUp.setAttribute('onclick', 'closeWebsiteInfo()')
}

function vergithub() {
    window.open('https://github.com/naasdd', '_blank')
}

function fechar_websiteInfo() {
    hudproject = true
    closeWebsiteInfo()
}

function closeWebsiteInfo() {
    closeHudPanelById('webSiteInfo')
}
