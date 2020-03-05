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
  socImage.addEventListener('drop', handleDrop)
})()