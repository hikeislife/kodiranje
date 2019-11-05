document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()

  // TODO: sliku dodati
 
  const post = JSON.stringify({
    googTitle       : document.querySelector('#googTitle').value,
    socTitle        : document.querySelector('#socTitle').value,
    articleContent  : document.querySelector('#articleContent').value,
    courseName      : document.querySelector('#courseName').selectedIndex,
    googDesc        : document.querySelector('#googDesc').value,
    socDesc         : document.querySelector('#socDesc').value,
    publish         : document.querySelector('[for=publish]').control.checked,
    tags            : document.querySelector('#tags').value.replace(', ', ',').replace(' ,', ',').split(',')
  })
  fetch('/addPost', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: post
  }).then((r) => {
    console.log('post submited', r)
  }).catch((e) => {
    console.log('greška', e)
  }) 
  // console.log(post)
  console.log(JSON.parse(post).articleContent)
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