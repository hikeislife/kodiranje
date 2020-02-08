export default (function showHideMenu() {
  const editor = document.querySelector('.editContent')
  const empty = document.querySelector('body')
  const menu = document.querySelector('.editMenu')
  let cursorPos, element
  
  const showMenu = (e) => {
    e.preventDefault()
    const menu = document.querySelector('.editMenu')
    menu.style.display = "inline-block"
    console.log(e)
    menu.style.top = `${e.pageY - 20}px`
    menu.style.left = `${e.pageX - 10}px`
    cursorPos = document.getSelection().anchorOffset
    element = e.originalTarget
  }

  editor.addEventListener( 'contextmenu', showMenu )

  empty.addEventListener('click', (e) => {
    menu.style.display = "none"
  })

  menu.querySelectorAll('ul li').forEach(li => {
    li.addEventListener('click', e => {
      insertSnippet(e.target.dataset.insert, cursorPos, element)
    })
  })
})()

const insertSnippet = (snippet, cursorPos, element) => {
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








