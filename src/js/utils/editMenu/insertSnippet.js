export default function insertSnippet (e, details = {}) {
  /* w/o this line snippet gets inserted twice, once at target element, 
   * and then again on the parent element */
  e.stopPropagation()
  document.querySelector('.editMenu').style.display = 'none'
  const selected = document.getSelection()

  // target element:
  const element = selected.getRangeAt(0).commonAncestorContainer//.parentElement
  console.log(element)
  // text node cursor is placed at: 
  const textContent = element.parentElement.innerHTML
  //selected.getRangeAt(0).commonAncestorContainer.innerHTML
  const cursorStart = selected.anchorOffset
  const cursorEnd = selected.focusOffset

  // string parts being edited
  const preserveMe = textContent.substring(cursorStart, cursorEnd) || 'EDIT'
  const stringBefore = textContent.substring(0, cursorStart)
  const stringAfter = textContent.substring(cursorEnd)

  const snippet = e.target.dataset.insert
  let insert = ``//, details = {}

  switch (snippet) {
    case "titleH1":
      console.log(details.prvi)
      let topNav = ''
      if (details.prvi) {
        details.bookmark = ''
        details.topNavOpis = ''
        topNav = `
        <div>
          <div class="page-contents" contenteditable="false">Sadržaj strane:</div>
          <nav class="page-nav" contenteditable="false">
            <ul class="listless">
            </ul>
          </nav>
        </div>
        <p>${preserveMe}</p>
        `
      } else {
        topNav = `<p>${preserveMe}</p>`
      }
      insert = `${stringBefore}
      <section>
        <a name="${details.bookmark}" 
           title="${details.topNavOpis}" 
           aria-label="${details.aria}">
          <h1>${details.naslov}</h1>
        </a>
        ${topNav}
      </section>
      ${stringAfter}`
      break
    case "detailsTitle":
      insert = `${stringBefore}
      <section>
        <details class="sectionTitle">
          <summary>
            <a name="${details.bookmark}" 
               aria-label="${details.aria}" 
               title="${details.topNavOpis}">
              <h1>${details.naslov}</h1>
            </a>
          </summary>
          ${preserveMe}
        </details>
      </section>
      ${stringAfter}`
      break
    case "titleH2":
      insert = `${stringBefore}<h2>${preserveMe}</h2>${stringAfter}`
      break
    case "titleH3":
      insert = `${stringBefore}<h3>${preserveMe}</h3>${stringAfter}`
      break
    case "greenHighlight":
      insert = `${stringBefore}<span class="highlight">${preserveMe}</span>${stringAfter}`
      break
    case "grayHighlight":
      insert = `${stringBefore}<em>${preserveMe}</em>${stringAfter}`
      break
    case "quote":
      insert = `${stringBefore}
        <blockquote>
          ${preserveMe}
          <cite>EDIT</cite>
        </blockquote>
        ${stringAfter}`
      break
    case "tooltip":
      insert = `${stringBefore}
        <span class="tt">
          EDIT 
          <span class="ttt">${preserveMe}</span>
        </span> 
        ${stringAfter}`
      break
    case "slika":
      insert = ``
      break
    case "details":
      insert = `${stringBefore}
        <details>
          <summary><p>${preserveMe}</p></summary>
          <p>EDIT</p>
        </details>
        ${stringAfter}`
      break
    case "extLink":
      insert = `${stringBefore}
      <a href="${details.url}" 
         target="_blank" 
         rel="noopener nofollow noreferrer" 
         hreflang="${details.lang}" 
         aria-label="${details.aria}">
         ${details.description}
         </a>
         ${stringAfter}`
      break
    case "intLink":
      insert = `${stringBefore}
      <a href="${details.url}" 
         hreflang="sr" 
         aria-label="${details.aria}">
        ${details.description}
      </a>
      ${stringAfter}`
      break
    case "ref":
      insert = `${stringBefore}<span></span>${stringAfter}`
      break
    case "tip":
      insert = `${stringBefore}<div class="superbox tip"><p>${preserveMe}</p></div> ${stringAfter}`
      break
    case "quiz":
      insert = `${stringBefore} <div class="superbox quiz"><p>${preserveMe}</p></div> ${stringAfter}`
      break
    case "warning":
      insert = `${stringBefore}<div class="superbox warning"><p>${preserveMe}</p></div> ${stringAfter}`
      break
    case "why":
      insert = `${stringBefore}<div class="superbox why"><p>${preserveMe}</p></div> ${stringAfter}`
      break
    case "bug":
      insert = `${stringBefore}<div class="superbox bug"><p>${preserveMe}</p></div> ${stringAfter}`
      break
    case "sol":
      insert = `${stringBefore}<div class="superbox sol"><code>${preserveMe}</code></div>${stringAfter}`
      break
    case "terminal":
      insert = `${stringBefore}${preserveMe}${stringAfter}`
      break
    case "console":
      insert = `${stringBefore}${preserveMe}${stringAfter}`
      break
    case "ard":
      insert = `${stringBefore}${preserveMe}${stringAfter}`
      break
    case "pinkCode":
      insert = `${stringBefore}<span class="pink">${preserveMe}</span>${stringAfter}`
      break
    case "greenCode":
      insert = `${stringBefore}<span class="green">${preserveMe}</span>${stringAfter}`
      break
    case "violetCode":
      insert = `${stringBefore}<span class="violet">${preserveMe}</span>${stringAfter}`
      break
    case "blueCode":
      insert = `${stringBefore}<span class="royal">${preserveMe}</span>${stringAfter}`
      break
    case "dimCode":
      insert = `${stringBefore}<span class="dim">${preserveMe}</span>${stringAfter}`
      break
    case "opekaCode":
      insert = `${stringBefore}<span class="opeka">${preserveMe}</span>${stringAfter}`
      break
    case "spell":
      insert = `${stringBefore}<span class="squigly">${preserveMe}</span>${stringAfter}`
      break
    case "smiley":
      insert = `${stringBefore}<span class="em smiley"></span>${stringAfter}`
      break
    case "unamused":
      insert = `${stringBefore}<span class="em unamused"></span>${stringAfter}`
      break
    case "cray":
      insert = `${stringBefore}<span class="em cray"></span>${stringAfter}`
      break
    case "plaz":
      insert = `${stringBefore}<span class="em plaz"></span>${stringAfter}`
      break
    case "up":
      insert = `${stringBefore}<span class="em up"></span>${stringAfter}`
      break
    default:
      insert = ``
  }
  //console.log(insert)
  element.parentElement.innerHTML = insert
}

