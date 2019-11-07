document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()

  // TODO: add validation, duh
  
  const admin = JSON.stringify({
    name     : document.querySelector('#adminName').value,
    username : document.querySelector('#username').value,
    password : document.querySelector('#password').value,
    email    : document.querySelector('#email').value,
  })

  console.log("poslato: ", admin)

  fetch('/api/addNewAdmin', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Content-length': '50Mb'
    },
    body: admin
  }).then((r) => {
    console.log('admin submited', r)
  }).catch((e) => {
    console.log('greška', e)
  }) 
 })