import go from './go.js'
// import eol from './eol.js'



export default (function sideways() {
  const left = document.querySelector('.prevIcon').parentElement.parentElement
  const right = document.querySelector('.nextIcon').parentElement.parentElement
  
  left.addEventListener('click', () => {
    go('left')
  })

  right.addEventListener('click', (e) => {
    go('right')
  })
})()