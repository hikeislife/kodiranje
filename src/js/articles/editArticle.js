export default (function doTheFetch() {
  const form = document.querySelector('form'),
        saveButton = document.querySelector('#saveButton')
  saveButton.addEventListener('click', e => {
    let articleContent = ''
    if (document.querySelector('.contentTextArea')) articleContent = document.querySelector('.contentTextArea').value
    else if (document.querySelector('.editContent')) articleContent = document.querySelector('.editContent').innerHTML
    
    const data = {
      articleContent: articleContent,
      published:  form.querySelector('#published').checked,
      googTitle:  form.querySelector('#googTitle').value,
      googDesc:   form.querySelector('#googDesc').value,
      socTitle:   form.querySelector('#socTitle').value,
      socDesc:    form.querySelector('#socDesc').value,
      socImage:   form.querySelector('#socImage').value,
      courseName: form.querySelector('#courseName').value,
      navName:    form.querySelector('#navName').value,
      tags: form.querySelector('#tags').value.split(',').map(x => x.trim())
    }
    fetch(`/admin/edit-article/${form.dataset['articleid']}`, {
      method: 'PATCH',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(() => window.location.href = `/admin/svi-artikli`)
  })
  
})()