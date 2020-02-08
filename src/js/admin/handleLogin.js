console.log('log me in')

const runValidation = () => {
  const username     = document.querySelector('#username').value,
        password     = document.querySelector('#password').value,
        adminError   = document.querySelector('.adminError')
  let   errorMessage = ''
  
  if (!username) errorMessage = 'Korisničko ime je obavezno!'
  else if (!password) errorMessage = 'Lozinka je obavezno polje!'
  if (errorMessage) {
    adminError.style.display = 'block'
    adminError.innerHTML = errorMessage
  }
  else {
    adminError.style.display = 'none'
    return { username, password }
  }
}

const handleLogin = e => {
  e.preventDefault()
  const data = runValidation()
  
}

const login = (() => {
  const button = document.querySelector('.admin-loginButton')
  button.addEventListener('click', handleLogin)
})()