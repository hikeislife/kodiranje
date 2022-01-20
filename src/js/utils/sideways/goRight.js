import eol from './eol.js'

export default function goLeft (uris, current, total) {
  const right = document.querySelector('.nextIcon').parentElement.parentElement

  if(current + 1 < total) {
    window.location = uris[current + 1]
  }
  else {
    eol(right)
  }
}