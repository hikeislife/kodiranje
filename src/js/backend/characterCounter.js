// the counter display has to have data-counter="initial value" // and .adminCounter
// inputs with counters need to have .countMe
//window.addEventListener('load', () => {
export default (function characterCounter () {
  const countUs = document.querySelectorAll('.countMe')

  const makeItRed = counter => {
    if (Number(counter.textContent) < 0) counter.classList.add("redColor")
    else counter.classList.remove("redColor")
  }

  const setCounter = obj => {
    const counter = obj.parentElement.querySelector('[data-counter]')
    const initialValue = counter.dataset.counter
    counter.innerHTML = initialValue - obj.value.length
    makeItRed(counter)
  }

  countUs.forEach(c => {
    if (c.value != '') setCounter(c)
  })

  countUs.forEach(c => c.addEventListener('keyup', () => {
    setCounter(c)
  }))
})()