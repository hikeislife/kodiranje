const handleFetch = e => {
  e.preventDefault()
  const form = document.querySelector('form')

  let articleContent = ''
  if (document.querySelector('.contentTextArea')) articleContent = document.querySelector('.contentTextArea').value
  else if (document.querySelector('.editContent')) articleContent = document.querySelector('.editContent').innerHTML.trim()
  const tags = form.querySelector('#tags').value.split(',').map(x => x.trim())

  const data = {
    articleContent: articleContent,
    published:  form.querySelector('#published').checked,
    googTitle:  form.querySelector('#googTitle').value,
    googDesc:   form.querySelector('#googDesc').value,
    socTitle:   form.querySelector('#socTitle').value,
    socDesc:    form.querySelector('#socDesc').value,
    //socImage:   form.querySelector('#socImage').value,
    courseName: form.querySelector('#courseName').value,
    navName:    form.querySelector('#navName').value,
    tags
  }
  
  const formData = new FormData();
  for (let name in data) {
    formData.append(name, data[name]);
  }

  //console.log(formData.get('articleContent'))

  fetch(`/admin/edit-article/${form.dataset['articleid']}`, {
    method: 'POST',
    cache: 'no-cache',
    body: formData
  })//.then(() => window.location.href = `/admin/svi-artikli`)
}

export default (function doTheFetch() {
  const saveButton = document.querySelector('#dugme')
  saveButton.addEventListener('click', handleFetch)
})()