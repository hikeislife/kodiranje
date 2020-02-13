const showBackToTop = e => {
  const backToTop = document.querySelector('.backToTop')
  const firstAppearance = document.documentElement.scrollTop
  const maxAppearance = document.documentElement.scrollHeight - document.documentElement.clientHeight
  console.log({document})
  if (document.body.scrollTop >= 600 || firstAppearance >= 600) {
    backToTop.style.display = 'inline-flex'
  }
  else if (document.body.scrollTop < 600 || firstAppearance < 600) {
    backToTop.style.display = 'none'
  }
  if (maxAppearance - document.documentElement.scrollTop < 500) {
    backToTop.style.bottom = `${document.documentElement.scrollTop - maxAppearance + 580}px`
  }
  else if (maxAppearance - document.documentElement.scrollTop >= 500) {
    backToTop.style.bottom = '50px'
  }
}

export default (function backToTop () {
  window.addEventListener('scroll', showBackToTop)
  
})()