let create = document.getElementById('cadastrarContainer')

create.addEventListener('submit', () => {
    event.preventDefault()
    let email = document.getElementById('email').value
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value

    fetch('/signIn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password })
    })
        .then(response => {
            if (response.status != 200) {
                throw new Error('something failed')
            }
            else {
                return response.json()
            }
        })
        .then(data => {
            window.alert('Conta criada com sucesso.')
            window.location.href = 'login.html'
        })
})