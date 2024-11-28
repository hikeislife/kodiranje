/*
  To add reference place 
  span element with 
  data-ref="URL" and
  data-ref-desc="DESC"
  where you want to insert the ref
*/
export default function renderReferenceList() {
  // all refs
  const refList    = document.querySelectorAll('.insertRef')
  // element to which references will be appended
  const refDisplay = document.querySelector('article')
  let   listToAdd  = ''
  const duplicates = []

  const repeatRef = (ref, i) => {
    ref.innerHTML = `<sup><a href="#reference${i}"><span class="refBrackets">[${i}]</span></a></sup>`
    ref.id = `goTo${i}`
  }

  const newRef = (ref, i) => {

    ref.innerHTML = `<sup><a href="#reference${i}"><span class="refBrackets">[${i}]</span></a></sup>`
    ref.id = `goTo${i}`

    listToAdd += `
      <li id="reference${i}" class="referalItem">
        <a href=#goTo${i}>[&#8593;]</a> 
        <span class="squeezeReferences">[${i}]
          <a href="${ref.dataset.ref}" class="referenceLink nocolor" target="_blank" rel="noopener nofollow noreferrer" hreflang="en" aria-label="referenca ${ref.dataset.refDesc}">${ref.dataset.refDesc}</a>
        </span>
      </li>\n`
  }
  
  // check for repeated references
  refList.forEach(ref => {
    if (duplicates.includes(ref.dataset.ref)) {
      repeatRef(ref, duplicates.indexOf(ref.dataset.ref) + 1)
    } else {
      duplicates.push(ref.dataset.ref)
      newRef(ref, duplicates.length)
    }
  })


  if (refList.length) {
    // create sectin of references
    const sec = document.createElement('section')
    sec.id = 'refs'
    sec.className = "references"
    refDisplay.appendChild(sec)

    // create reference list anchor so that it shows up in pageNav list
    const asec = document.createElement('a')
    asec.setAttribute('name', 'refs')
    asec.setAttribute('data-aria-label', 'Lista referenci')
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