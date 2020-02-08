export default (function guiCodeSwitcher() {
  const gui      = document.querySelector('.showMeGUI'),
        code     = document.querySelector('.showMeCode'),
        switcher = document.querySelector('.switcher')

  gui.addEventListener('click', e => {
    if (document.querySelector('.contentTextArea')) {
      let codeContent = document.querySelector('.contentTextArea').value
      
      const gui = document.createElement('div')
      gui.id = 'articleContent'
      gui.classList.add('editContent')
      gui[name] = 'articleContent'
      gui['contenteditable'] = true
      gui.innerHTML = codeContent
      switcher.innerHTML = ''
      switcher.appendChild(gui)
    }
  })

  code.addEventListener('click', e => {
    if (document.querySelector('.editContent')) {
      let guiContent = document.querySelector('.editContent').innerHTML
      
      const textArea = document.createElement('textarea')
      textArea.classList.add('contentTextArea')
      textArea['name'] = 'articleContent'
      textArea.id = 'articleContent'
      switcher.innerHTML = ''
      switcher.appendChild(textArea)
      textArea.value = guiContent
    }
    
  })
})()