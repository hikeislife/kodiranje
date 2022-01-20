// Side nav handler for mobile
export default (() => {
  const nav = document.querySelector('.sideNav')
  const cog = document.querySelector('.mobMenuButton')
  const twoButtons = document.querySelector('.twoButtons')
  let handler
  const magicWidth = 768

  const closeMenu = () => {
    nav.style.display = 'none'
    twoButtons.style.display = 'none'
    window.removeEventListener('click', closeMenu)
  }

  const mobMenuHandler = () => {
    const displayState = nav.style.display
    if (displayState == 'none') {
      nav.style.display = 'block'
      twoButtons.style.display = 'grid'
      setTimeout(() => {
        window.addEventListener('click', closeMenu)
      }, 1000);

    } else {
      nav.style.display = 'none'
      twoButtons.style.display = 'none'
    }
  }

  (handler = function () {
    const width = window.innerWidth
    
    // mobile
    if (width < magicWidth) {
      nav.style.display = 'none'
      cog.addEventListener('click', mobMenuHandler)
    } // desktop
    else if (width => magicWidth) {
      nav.style.display = 'block'
      window.removeEventListener('click', closeMenu)
      cog.removeEventListener('click', mobMenuHandler)
    }

    window.onresize = handler
  })()
})();