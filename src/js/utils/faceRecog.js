(function faceRecog() {
  const hovers = document.querySelectorAll('[data-showme]')

  hovers.forEach(h => {
    h.addEventListener('mouseover', () => {
      document.querySelector(`[data-person="${h.dataset.showme}"]`).style.opacity = 1
    })
    h.addEventListener('mouseout', () => {
      document.querySelector(`[data-person="${h.dataset.showme}"]`).style.opacity = 0
    })
  })
})()