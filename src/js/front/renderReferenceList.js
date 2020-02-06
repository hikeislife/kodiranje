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
  let   listToAdd = ''

  console.log(refList)

for (let i = 0; i < refList.length; i++) {
  refList[i].innerHTML = `<sup><a href="#reference${i}">[${i + 1}]</a><sup>`
  listToAdd += `<li id="reference${i}">[${i + 1}] <a href="${refList[i].dataset.ref}" target="_blank" rel="noopener nofollow noreferrer" hreflang="en" aria-label="referenca ${refList[i].dataset.refDesc}">${refList[i].dataset.refDesc}</a></li>\n`
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
}}