const indicateScrollPosition = e => {
  const indicator = document.querySelector('.indicator'),
        totalPageHeight = document.documentElement.offsetHeight - document.documentElement.clientHeight,
        currentPos = document.documentElement.scrollTop,
        percentile = currentPos * 100 / totalPageHeight
  indicator.style.width = `${percentile}%`
}

export default (function scrollPos () {
  window.addEventListener('scroll', indicateScrollPosition)
})()