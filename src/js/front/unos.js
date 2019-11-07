import characterCounter from "./characterCounter.js";

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()

  // TODO: sliku dodati
  // const regBlank = wth did I mean by this?
  
  const post = JSON.stringify({
    navName         : document.querySelector('#selectURL').value.trim(),
    order           : 0,
    courseName      : document.querySelector('#courseName').selectedOptions[0].value,
    googTitle       : document.querySelector('#googTitle').value,
    googDesc: document.querySelector('#googDesc').value,
    socTitle        : document.querySelector('#socTitle').value,
    socImage        : '',
    socDesc         : document.querySelector('#socDesc').value,
    published         : document.querySelector('[for=publish]').control.checked,
    tags            : document.querySelector('#tags').value.replace(/, /gi, ',').replace(/ ,/gi, ',').split(','),
    selectedURL       : document.querySelector('#selectURL').value.trim().replace(/ /gi, '-').toLowerCase(),
    created         : new Date().toLocaleDateString('sr-RS', { day: '2-digit', month: '2-digit', year: 'numeric'}),
    edited          : '',
    author          : 'K',
    articleContent  : document.querySelector('#articleContent').value,
  })
  //console.log(post)
  fetch('/admin/addPost', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Content-length': '50Mb'
    },
    body: post
  }).then((r) => {
    console.log('post submited', r)
  }).catch((e) => {
    console.log('greška', e)
  }) 
})

characterCounter()