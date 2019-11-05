document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()

  // TODO: sliku dodati
  //const regBlank = 
  const post = JSON.stringify({
    googTitle       : document.querySelector('#googTitle').value,
    socTitle        : document.querySelector('#socTitle').value,
    articleContent  : document.querySelector('#articleContent').value,
    courseName      : document.querySelector('#courseName').selectedOptions[0].value,
    googDesc        : document.querySelector('#googDesc').value,
    socDesc         : document.querySelector('#socDesc').value,
    publish         : document.querySelector('[for=publish]').control.checked,
    tags            : document.querySelector('#tags').value.replace(/, /gi, ',').replace(/ ,/gi, ',').split(','),
    selectURL       : document.querySelector('#selectURL').value.trim().replace(/ /gi, '-').toLowerCase(),
    created         : new Date().toLocaleDateString('sr-RS', { day: '2-digit', month: '2-digit', year: 'numeric'}),
    edited          : '',
    author          : '',
  })
  //console.log(JSON.parse(post))
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







// the counter display has to have data-counter="initial value" // and .adminCounter
  // inputs with counters need to have .countMe
  //window.addEventListener('load', () => {
  characterCounter = (() => {
    const countUs = document.querySelectorAll('.countMe')

    makeItRed = counter => {
      if(Number(counter.textContent) < 0) counter.classList.add("redColor")
      else counter.classList.remove("redColor")
    }

    setCounter = obj => {
      const counter = obj.parentElement.querySelector('[data-counter]')
      const initialValue = counter.dataset.counter
      counter.innerHTML = initialValue - obj.value.length
      makeItRed(counter)
    }

    countUs.forEach(c => {
      if(c.value != '') setCounter(c)
    })

    countUs.forEach(c => c.addEventListener('keyup', () => {
      setCounter(c)
    }))
  })();