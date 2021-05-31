/*
  To add reference place 
  span element with 
  data-ref="URL" and
  data-ref-desc="DESC"
  where you want to insert the ref
*/
export default function renderReferenceList() {
  const refList = document.querySelectorAll('.insertRef'),
    refDisplay = document.querySelector('article')
  let listToAdd = ''

  for (let i = 0; i < refList.length; i++) {
    refList[i].innerHTML = `<sup><a href="#reference${i}">[${i + 1}]</a><sup>`
    refList[i].id = `goTo${i}`
    listToAdd += `<li id="reference${i}"><a href=#goTo${i}>[&#8593;]</a>[${i + 1}] <a href="${refList[i].dataset.ref}" class="referenceLink" target="_blank" rel="noopener nofollow noreferrer" hreflang="en" aria-label="referenca ${refList[i].dataset.refDesc}">${refList[i].dataset.refDesc}</a></li>\n`
  }

  if (refList.length) {
    const sec = document.createElement('section')
    const secTit = document.createElement('h2')
    const ul = document.createElement('ul')
    refDisplay.appendChild(sec)
    sec.appendChild(secTit)
    sec.appendChild(ul)

    secTit.innerHTML = "Reference:"
    ul.className = "listless"

    ul.innerHTML = listToAdd
  }
}