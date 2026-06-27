let login = document.getElementById("loginContainer")
let mensagemErro = document.getElementById("mensagemErro")

login.addEventListener('submit', async (event) => {
    event.preventDefault()
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    try {
        await apiRequestJson('/logIn', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        window.location.href = 'index.html'
    }
    catch (error) {
        console.log(error)
        setSafeText(mensagemErro, error.message)
    }
})
