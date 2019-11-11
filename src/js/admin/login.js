document.querySelector('#dugme').addEventListener('click', (e) => {
  e.preventDefault
  const login = JSON.stringify({
    username: document.querySelector('#username').value,
    password: document.querySelector('#password').value
  })
  fetch('/api/login/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: login
  }).then(r => r.json())
    .then((data) => {
    //console.log(data)
    sessionStorage.setItem('jwt', JSON.stringify(data.token))
    sessionStorage.setItem('user', data.username)
    if(data.status === 200) {
      // fetch('/admin/novi-post/', {
      //   method: 'GET',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json',
      //     'Authorization': `${JSON.stringify(data.token)}`
      //   },
      //   redirect: 'follow'
      //   //body: login
      // })
      window.location = '/admin/novi-post'
    }
  }).catch((e) => {
    console.log('greška', e)
  }) 
})