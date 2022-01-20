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
      // window.location.href = 
      go('left')
    }
    else if(startX - 100 > deltaX) {
      // window.location.href = 
      go('right')
    }
  })

  // screen.addEventListener('touchcancel', (e) => {
  //   console.log('touchcancel')
  // })

  // screen.addEventListener('touchleave', (e) => {
  //   console.log('touchleave')
  // })

  // screen.addEventListener('touchforcechange', (e) => {
  //   console.log('touchforcechange')
  // })




})()