const editor = document.querySelector('.editContent')
editor.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  const menu = document.querySelector('.editMenu')
  menu.style.display = "inline-block"
  menu.style.top = `${e.layerY - 10}px`
  menu.style.left = `${e.layerX}px`
  console.log(e)
})

