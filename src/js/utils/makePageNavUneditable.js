const makeUneditable = element => {
  element['contentEditable'] = "false"
  element.addEventListener('contextmenu', e => {
    e.stopPropagation()
    e.preventDefault()
  })
}

export default (function sanitizeInput () {
  if (document.querySelector('.page-contents')) {
    makeUneditable(document.querySelector('.page-contents'))
    makeUneditable(document.querySelector('.page-nav'))
  }
})()

