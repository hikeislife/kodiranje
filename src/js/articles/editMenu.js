showHideMenu = (() => {
  const editor = document.querySelector('.editContent')
  const empty = document.querySelector('body')
  const menu = document.querySelector('.editMenu')
  let cursorPos, element

  editor.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    menu.style.display = "inline-block"
    menu.style.top = `${e.layerY - 10}px`
    menu.style.left = `${e.layerX}px`
    cursorPos = document.getSelection().anchorOffset
    //element = document.getSelection().anchorNode.ownerDocument.activeElement
    element = e.originalTarget
    //console.log(e)
  })

  empty.addEventListener('click', (e) => {
    menu.style.display = "none"
  })

  menu.querySelectorAll('ul li').forEach(li => {
    li.addEventListener('click', e => {
      insertSnippet(e.target.dataset.insert, cursorPos, element)
    })
  })
})()

insertSnippet = (snippet, cursorPos, element) => {
  const editor = document.querySelector('.editContent')
  //let strPos = editor.selectionStart
  let insertSnippet
  switch(snippet) {
    case "superbox":
      insertSnippet = `<div class="superbox sol">EDIT</div>`
      break
    default:
      insertSnippet = `\n`
  }
  console.log(insertSnippet)
  const strBefore = element.innerText.substring(0, cursorPos)
  const strAfter = element.innerText.substring(cursorPos, element.innerText.length)
  element.innerHTML = `${strBefore}${insertSnippet}${strAfter}`
}








