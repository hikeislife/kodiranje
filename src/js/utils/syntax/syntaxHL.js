import highHTML from "/utils/syntax/highlightHtml.js"
import highCSS from "/utils/syntax/highlightCss.js"


export default (function highlightCode () {
  const exampleHtml = document.querySelectorAll('.htmlCode')
  const exampleCss = document.querySelectorAll('.cssCode')
  let result = ''

  exampleHtml.forEach(htmlLine => {
    result = ''
    const tags = htmlLine.innerHTML.split(" ")
    tags.forEach(tag => {
      tag = highHTML(tag)
      result += ' ' + tag
    })
    htmlLine.innerHTML = result
  })

  exampleCss.forEach(cssLine => {
    cssLine.innerHTML = highCSS(cssLine)
  })
})()