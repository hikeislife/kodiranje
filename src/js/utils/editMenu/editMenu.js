import guiCodeSwitcher from "./guiCodeSwitcher.js" 
import insertSnippet from "./insertSnippet.js"
import loadLinkBox from "./loadLinkBox.js"
import loadH1Box from "./loadH1Box.js"

(function showHideMenu() {
  const editor = document.querySelector('.editContent')
  const empty = document.querySelector('body')
  const menu = document.querySelector('.editMenu')
  
  const showMenu = (e) => {
    e.preventDefault()
    menu.style.display = "inline-block"
    menu.style.top = `${e.pageY - 20}px`
    menu.style.left = `${e.pageX - 10}px`
  }

  editor.addEventListener( 'contextmenu', showMenu )

  /* Hide menu */
  empty.addEventListener('click', (e) => {
    menu.style.display = "none"
  })

  menu.querySelectorAll('.editMenuItem').forEach(item => {
    item.addEventListener('click', insertSnippet)
  })
})()