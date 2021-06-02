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
    listToAdd += `<li id="reference${i}" class="referalItem">
    <a href=#goTo${i}>[&#8593;]</a>[${i + 1}] 
    <span class="squeezeReferences"><a href="${refList[i].dataset.ref}" class="referenceLink nocolor" target="_blank" rel="noopener nofollow noreferrer" hreflang="en" aria-label="referenca ${refList[i].dataset.refDesc}">
    ${refList[i].dataset.refDesc}</a></span>
    </li>\n`
  }

  if (refList.length) {
    const sec = document.createElement('section')
    sec.style.marginBottom = "6rem"
    refDisplay.appendChild(sec)
    const secTit = document.createElement('div')
    secTit.className = 'referalTitle'
    const ul = document.createElement('ul')
    sec.appendChild(secTit)
    sec.appendChild(ul)

    secTit.innerHTML = "Reference:"
    ul.className = "listless"

    ul.innerHTML = listToAdd
  }
}