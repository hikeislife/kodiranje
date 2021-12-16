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
    listToAdd += `
    <li id="reference${i}" class="referalItem">
      <a href=#goTo${i}>[&#8593;]</a> 
      <span class="squeezeReferences">[${i + 1}]
        <a href="${refList[i].dataset.ref}" class="referenceLink nocolor" target="_blank" rel="noopener nofollow noreferrer" hreflang="en" aria-label="referenca ${refList[i].dataset.refDesc}">${refList[i].dataset.refDesc}</a>
      </span>
    </li>\n`
  }

  if (refList.length) {
    // create sectin of references
    const sec = document.createElement('section')
    sec.className = "references"
    refDisplay.appendChild(sec)

    // create reference list anchor so that it shows up in pageNav list
    const asec = document.createElement('a')
    asec.setAttribute('name', 'refs')
    asec.setAttribute('aria-label', 'Lista referenci')
    asec.dataset.title = "Lista referenci"
    sec.append(asec)

    // create reference list title card
    const secTit = document.createElement('div')
    secTit.className = 'referalTitle'
    secTit.innerHTML = "Reference:"
    sec.appendChild(secTit)

    //create nav:
    const nav = document.createElement('nav')
    nav.className = 'referalList'
    sec.appendChild(nav)
    
    // create ul element
    const ul = document.createElement('ul')
    ul.className = "listless"
    nav.appendChild(ul)

    ul.innerHTML = listToAdd
    sec.style.marginBottom = "6rem"
  }
}