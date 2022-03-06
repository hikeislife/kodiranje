import displayOGFileName from './displayOGFileName.js'

const handleDrop = e => {
  e.preventDefault()
  e.stopPropagation()
  
  document.querySelector('#socImage').files = e.dataTransfer.files
  displayOGFileName(e.dataTransfer.files[0].name)
}

export default (function dragDrop () {
  const socImage = document.querySelector('label[for="socImage"]')

  socImage.addEventListener('dragover', e => {
    e.preventDefault()
    e.stopPropagation()
  })

  ;['dragenter', 'dragover'].forEach(eventName => {
    socImage.addEventListener(eventName, highlight, false)
  })

  ;['dragleave', 'drop'].forEach(eventName => {
    socImage.addEventListener(eventName, unhighlight, false)
  })

  function highlight(e) {
    socImage.classList.add('highlight')
    socImage.style.color = 'green'
  }

  function unhighlight(e) {
    socImage.classList.remove('highlight')
    socImage.style.color = 'black'
  }
  socImage.addEventListener('drop', handleDrop)
})()