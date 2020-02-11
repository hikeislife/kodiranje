const getData = () => {
  const data = {
    name: document.querySelector('#name').value,
    username: document.querySelector('#username').value,
    password: document.querySelector('#password').value,
    newPassword: document.querySelector('#newPassword').value,
    email: document.querySelector('#email').value
  }
  return data
}

document.querySelector('#dugme').addEventListener('click', (e) => {
  e.preventDefault()

  const data = getData()
  const id = e.target.dataset.adminId
  
  fetch(`/admin/edit-admin/${id}`, {
    method: 'PATCH',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(() => window.location.href = `/admin/detalji/${id}`)
})