const makeUneditable = element => {
  element['contentEditable'] = "false"
  //element.removeEventListener('contextmenu', showMenu)
  element.addEventListener('contextmenu', e => {
    e.stopPropagation()
    e.preventDefault()
  })
}

export default (function sanitizeInput () {
  makeUneditable(document.querySelector('.page-contents'))
  makeUneditable(document.querySelector('.page-nav'))
})()

