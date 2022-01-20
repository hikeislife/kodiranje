const handleRedirect = () => {
  window.location = `../admin/svi-artikli/`
}



const runValidation = () => {
  const username = document.querySelector('#username').value,
    password = document.querySelector('#password').value,
    adminError = document.querySelector('.adminError')
  let errorMessage = ''

  if (!username) errorMessage = 'Korisničko ime je obavezno!'
  else if (!password) errorMessage = 'Lozinka je obavezno polje!'
  if (errorMessage) {
    adminError.style.display = 'block'
    adminError.innerHTML = errorMessage
    return false
  }
  else {
    adminError.style.display = 'none'
    return { username, password }
  }
}

const runAuthentication = async () => {
  const reqData = runValidation()
  if (reqData) {
    const response = await fetch(`/admin/login`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqData)
    })
    const data = await response.json()
    return data
  }

}

const handleLogin = async e => {
  e.preventDefault()
  const adminError = document.querySelector('.adminError')
  const response = await runAuthentication()
  if (!response) return false
  if (response.errorMessage) {
    adminError.style.display = 'block'
    adminError.innerHTML = response.errorMessage
  }
  else if (response.token) {
    adminError.style.display = 'none'
    localStorage.setItem('token', response.token)
    const d = new Date()

    d.setTime(d.getTime() + 24 * 60 * 60 * 1000) // in a day, in milliseconds

    const expires = `;expires=${d.toUTCString()};`
    document.cookie = `token=${response.token}${expires}`
    handleRedirect()
  }
}

const login = (() => {
  const button = document.querySelector('.admin-loginBtn')
  button.addEventListener('click', handleLogin)
})()