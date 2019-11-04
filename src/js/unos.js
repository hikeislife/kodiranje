console.log('unos.js')

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()
  const unos = JSON.stringify({
    googTitle: document.querySelector('#googTitle').value,
    socTitle: document.querySelector('#socTitle').value,
    articleContent: document.querySelector('#articleContent').value
  })
  console.log(unos)
  console.log(JSON.parse(unos).articleContent)
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


// const courseId = "hc"
// const tag = "uvod_u_hc"
// const contentsTemp = "long \\ <p>text</p>"
// const contents = JSON.stringify(contentsTemp)
// const title = "Uvod u hc"

//module.exports = { courseId, tag, contents, title }