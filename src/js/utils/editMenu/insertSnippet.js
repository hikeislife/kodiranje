export default function insertSnippet (e) {
  const selected = document.getSelection()

  // target element:
  const element = selected.getRangeAt(0).commonAncestorContainer.parentElement

  // text node cursor is placed at: 
  const textContent = element.innerHTML
  //selected.getRangeAt(0).commonAncestorContainer.innerHTML
  const cursorStart = selected.anchorOffset
  const cursorEnd = selected.focusOffset

  // string parts being edited
  const preserveMe = textContent.substring(cursorStart, cursorEnd) || 'EDIT'
  const stringBefore = textContent.substring(0, cursorStart)
  const stringAfter = textContent.substring(cursorEnd)

  const snippet = e.target.dataset.insert
  let insert = ``

  switch (snippet) {
    case "sol":
      insert = `${stringBefore}<div class="superbox sol"><code>${preserveMe}</code></div> ${stringAfter}`
      break
    case "greenHighlight":
      insert = `${stringBefore}<span class="highlight">${preserveMe}</span>${stringAfter}`
      break
    case "grayHighlight":
      insert = `${stringBefore}<em>${preserveMe}</em>${stringAfter}`
      break
    default:
      insert = ``
  }
  element.innerHTML = insert
}