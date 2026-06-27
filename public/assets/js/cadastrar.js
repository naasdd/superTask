let create = document.getElementById('cadastrarContainer')

create.addEventListener('submit', async (event) => {
    event.preventDefault()
    let email = document.getElementById('email').value
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value

    try {
        await apiRequestJson('/signIn', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, username, password })
        })

        window.alert('Conta criada com sucesso.')
        window.location.href = 'login.html'
    }
    catch (error) {
        window.alert(error.message)
    }
})
