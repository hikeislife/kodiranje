const indicateScrollPosition = e => {
  let indicator = document.querySelector('progress')
  const totalPageHeight = document.documentElement.offsetHeight - document.documentElement.clientHeight
  const currentPos = document.documentElement.scrollTop
  const percentige = currentPos * 100 / totalPageHeight
  indicator.attributes[0].value = `${percentige}`
  indicator.style.display = 'block'
  // if (percentige < 10) {
  //   indicator.style.top = '-7px'
  // }
}

indicateScrollPosition()

export default (function scrollPos() {
  window.addEventListener('scroll', indicateScrollPosition)
})()