const handleDrop = e => {
  e.preventDefault()
  e.stopPropagation()
  console.log(e.dataTransfer.files[0])
  //document.querySelector('#socImage').files.push(e.dataTransfer.files[0])
  document.querySelector('#socImage').files = e.dataTransfer.files
  document.querySelector('label[for="socImage"]').innerHTML = `
  Slika za društvene mreže 1200x630px sa banerom
  <p>${e.dataTransfer.files[0].name}</p>`
}

export default (function dragDrop () {
  const socImage = document.querySelector('label[for="socImage"]')
  // window.addEventListener('drop', e => {
  // //   //console.log(e)
  //   e.preventDefault()
  //   e.stopPropagation()
  // })
  // window.addEventListener('dragover', e => {
  // //   //console.log(e)
  //   e.preventDefault()
  //   e.stopPropagation()
  // })
  socImage.addEventListener('dragover', e => {
    e.preventDefault()
    e.stopPropagation()
  })
  socImage.addEventListener('drop', handleDrop)
})()