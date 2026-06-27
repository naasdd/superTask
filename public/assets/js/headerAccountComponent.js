function userIcon() {
    apiRequestJson('/validateAccount')
        .then((data) => {
            openUserIcon(data)
        })
        .catch(() => {
            window.location.href = './login.html'
        })
}

function openUserIcon(data) {
    openMenuShowUp()

    const userIconMenu = buildHudPanel('div', 'userIconMenu', `
        <div id="divImgUser">
            <i class="bi bi-person-circle bi-lg"></i>
        </div>
        <p id="userEmail"></p>
        <button type="button" id="logoutButton">Sair da conta</button>
        <button type="button" id="cancelUserIconButton">Cancelar</button>
    `)

    setSafeText(userIconMenu.querySelector('#userEmail'), data.email)

    userIconMenu.querySelector('#logoutButton').addEventListener('click', logout)
    userIconMenu.querySelector('#cancelUserIconButton').addEventListener('click', fechar_usericon)

    menuShowUp.setAttribute('onclick', 'closeUserIcon()')
}

function fechar_usericon() {
    hudproject = true
    closeUserIcon()
}

function closeUserIcon() {
    closeHudPanelById('userIconMenu')
}

function logout() {
    apiRequestJson('/logOut', {
        method: 'POST'
    })
        .catch(() => {})
        .finally(() => {
            window.location.href = './login.html'
        })
}
