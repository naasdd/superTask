let login = document.getElementById("loginContainer")
let mensagemErro = document.getElementById("mensagemErro")

login.addEventListener('submit', () => {
    event.preventDefault()
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    fetch('/logIn', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password})
    })
    .then(async response =>{
        if(response.status != 200){
            const respostaErro = await response.json()
            console.log(respostaErro)
            mensagemErro.innerHTML = respostaErro.Message
        }
        else{
            return response.json()
        }
    })
    .then(data => {
        let token = data.token
        localStorage.setItem('token', token)
        window.location.href = 'index.html'
    })
})