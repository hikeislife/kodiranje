document.querySelector('#dugme').addEventListener('click', (e) => {
  e.preventDefault()
  const name = document.querySelector('#name').value,
        username = document.querySelector('#username').value,
        password = document.querySelector('#password').value,
        newPassword = document.querySelector('#newPassword').value,
        email = document.querySelector('#email').value
  
  const data = {
    name,
    username,
    password,
    newPassword,
    email
  }
  fetch(`/admin/edit-admin/${e.target.dataset.adminId}`, {
    method: 'PATCH',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(() => window.location.href = `/admin/detalji/${e.target.dataset.adminId}`)
})