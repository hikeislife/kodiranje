export default function eol(el) {
  const notification = document.createElement('div')
  notification.classList.add('eol')
  notification.innerHTML = '<p>Nema dalje <span class="smiley em"></span></p>'
  el.appendChild(notification)
  notification.style.opacity = '1'
  setTimeout(() => {
    notification.style.opacity = '0'
  }, 150)
}