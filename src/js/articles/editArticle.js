// import handleFetch       from './../backend/handleSaveFetch.js'
import displayOGFileName from './../backend/displayOGFileName.js'

const file = {
  dom: document.querySelector('#socImage'),
  binary: null
}

const setReader = (() => {
  const reader = new FileReader()
  
  if (file.dom.files[0]) {
    reader.readAsBinaryString(file.dom.files[0])
  }

  file.dom.addEventListener("change", function () {
    if (reader.readyState === FileReader.LOADING) {
      reader.abort()
    }

    reader.readAsBinaryString(file.dom.files[0]);
  })

  reader.addEventListener("load", (e) => {
    file.binary = reader.result
  })
})()

const handleFetch = e => {
  e.preventDefault()

  // if reader is not ready, exit and try again in 10ms
  if (!file.binary && file.dom.files.length > 0) {
    setTimeout(sendData, 10);
    return;
  }

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
    socImage:   form.querySelector('#socImage').files[0],
    courseName: form.querySelector('#courseName').value,
    navName:    form.querySelector('#navName').value,
    subSec:     form.querySelector('#subSec').value,
    tags
  }

  const formData = new FormData();
  for (let name in data) {
    formData.append(name, data[name]);
  }

  fetch(`/admin/edit-article/${form.dataset['articleid']}`, {
    method: 'PATCH',
    cache: 'no-cache',
    body: formData
  }).then(() => window.location.href = `/admin/svi-kursevi`)
}

(function keyBinder () {
  let isCtrl = false;
  document.onkeyup=function(e){
    if(e.keyCode == 17) isCtrl=false;
  }

  document.onkeydown=function(e){
    if(e.keyCode == 17) isCtrl=true;
    if(e.keyCode == 83 && isCtrl == true) {
      handleFetch(e)
        //run code for CTRL+S -- ie, save!
      return false;
    }
  }
})()

export default (function doTheFetch() {
  const saveButton = document.querySelector('#dugme'),
        socImage = document.querySelector('#socImage'),
        label = document.querySelector('label[for="socImage"]')
  saveButton.addEventListener('click', handleFetch)
  
  if (socImage.files[0]) {
    displayOGFileName(socImage.files[0].name)
  }
  socImage.addEventListener('change', e => {
    displayOGFileName(e.target.files[0].name)
  })
})()