import go from './go.js'

export default (function swipe () {
  const screen = document.querySelector('body')
  let startX
  let deltaX

  screen.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX
  })

  screen.addEventListener('touchmove', (e) => {
    deltaX = e.touches[0].clientX
  })

  screen.addEventListener('touchend', (e) => {

    if(startX + 100 < deltaX) {
      go('left')
    }
    else if(startX - 100 > deltaX) {
      go('right')
    }
  })
})()