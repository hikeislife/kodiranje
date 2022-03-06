// Side nav handler for mobile
// will disable page scrolling when side nav is open
export default (() => {
  const nav = document.querySelector('.sideNav')

  const cog = document.querySelector('.mobMenuButton')

  const additionalButtons = document.querySelector('.additionalButtons')

  const mobileNav = document.querySelector('.bottom-nav')

  const doc = document.documentElement
  let handler
  const magicWidth = 768

  

  const closeMenu = () => {
    nav.style.display = 'none'
    additionalButtons.style.display = 'none'
    doc.style.overflow = 'auto'
    window.removeEventListener('click', closeMenu)
  }

  const mobMenuHandler = () => {
    const displayState = nav.style.display
    console.log(displayState)
    if (displayState == 'none') {
      nav.style.display = 'block'
      additionalButtons.style.display = 'grid'
      doc.style.overflow = 'hidden'
      if(mobileNav.style.paddingRight == 0) {
        mobileNav.style.paddingRight = '1.3rem'
        
      }
      setTimeout(() => {
        window.addEventListener('click', closeMenu)
      }, 1000);

    } else {
      nav.style.display = 'none'
      additionalButtons.style.display = 'none'
      doc.style.overflow = 'auto'
      mobileNav.style.paddingRight = '0'
    }
  }

  // fix nv when screen is resized

  (handler = function () {
    const width = window.innerWidth
    
    // mobile
    if (width < magicWidth) {
      nav.style.display = 'none'
      additionalButtons.style.display = 'none'
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