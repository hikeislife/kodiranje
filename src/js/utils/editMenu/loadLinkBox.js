import insertSnippet from "./insertSnippet.js"

const closeLinkBox = e => {
  e.preventDefault()
  document.querySelector('.linkBox').style.display = 'none'
  document.querySelector('.overlay').style.display = 'none'
}

const showLinkBox = e => {
  const linkBox = document.querySelector('.linkBox')
  linkBox.style.display = 'inline-block'
  const overlay = document.querySelector('.overlay')
  overlay.style.display = 'grid'
  overlay.appendChild(linkBox)
  const option = e.target.dataset.drop
  if(option === 'extLink') {
    linkBox.querySelector('.linkBoxTitle').innerHTML = "Unos spoljnog linka"
    linkBox.querySelector('#linkLang').parentElement.style.display = 'block'
  }
  else if (option === 'intLink') {
    linkBox.querySelector('.linkBoxTitle').innerHTML = "Unos bookmarka"
    linkBox.querySelector('#linkLang').parentElement.style.display = 'none'
  }
}

export default (function loadLinkBox () {
  const links = document.querySelectorAll('.loadLinkBox')
  links.forEach(x => x.addEventListener('click', showLinkBox))
})()

const submitLinkBox = async (e) => {
  e.preventDefault()
  const details = {
    url: document.querySelector('#linkUrl').value,
    description: document.querySelector('#linkDesc').value,
    aria: document.querySelector('#linkAria').value,
    lang: document.querySelector('#linkLang')/*.option*/[document.querySelector('#linkLang').selectedIndex].value
  }
  document.querySelector('.overlay').style.display = 'none'
  insertSnippet(e, details)
}

const preRun = (() => {
  if (document.querySelector('.closeButton'))
  document.querySelector('.closeButton').addEventListener('click', closeLinkBox)
  if (document.querySelector('.insertLink'))
  document.querySelector('.insertLink').addEventListener('click', submitLinkBox)
})()