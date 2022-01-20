import eol from './eol.js'

export default function goLeft (uris, current, total) {
  const left = document.querySelector('.prevIcon').parentElement.parentElement
  
  if (current > 0) {
    window.location = uris[current - 1]
  }
  else {
    eol(left)
  }
    // }
}