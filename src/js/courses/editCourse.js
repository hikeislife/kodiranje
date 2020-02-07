const dugme = document.querySelector('#dugme')
dugme.addEventListener('click', e => {
  e.preventDefault()
  console.log(e.target.dataset.courseId)
  const name = document.querySelector('#name').value,
        active = document.querySelector('#active').checked
  
  const data = {
    name,
    active
  }
  //console.log(data)
  fetch(`/admin/edit-course/${e.target.dataset.courseId}`, {
    method: 'PATCH',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(() => window.location.href = `/admin/detalji-kursa/${e.target.dataset.courseId}`)
})