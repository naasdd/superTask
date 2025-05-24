let login = document.getElementById("loginContainer")

login.addEventListener('submit', () => {
    event.preventDefault()
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    fetch('/logIn', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password})
    })
    .then(response =>{
        if(response.status != 200){
            throw new Error('something failed')
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