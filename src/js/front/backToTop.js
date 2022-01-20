const showBackToTop = e => {
  const backToTop = document.querySelector('.backToTop')
  const firstAppearance = document.documentElement.scrollTop
  const maxAppearance = document.documentElement.scrollHeight - document.documentElement.clientHeight
  const topMenu = document.querySelector(".topNavWrapper")
  const magicWidth = 768
  const currentWidth = topMenu.parentElement.scrollWidth
  if (currentWidth >= magicWidth) {
    if (document.body.scrollTop >= 600 || firstAppearance >= 600) {
      backToTop.style.display = 'inline-flex'
    }
    else if (document.body.scrollTop < 600 || firstAppearance < 600) {
      backToTop.style.display = 'none'
    }
    if (maxAppearance - document.documentElement.scrollTop < 500) {
    backToTop.style.bottom = `${document.documentElement.scrollTop -   maxAppearance + 580}px`
    }
    else if (maxAppearance - document.documentElement.scrollTop >= 500) {
      backToTop.style.bottom = '50px'
    }
  } else {
    backToTop.style.display = 'none'
  }
}

export default (function backToTop () {
  window.addEventListener('scroll', showBackToTop)
  
})()