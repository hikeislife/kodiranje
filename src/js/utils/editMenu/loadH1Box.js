import insertSnippet from "./insertSnippet.js"

const closeH1Box = e => {
  e.preventDefault()
  document.querySelector('.heading1').style.display = 'none'
  document.querySelector('.overlay').style.display = 'none'
}

const showH1Box = e => {
  const h1Box = document.querySelector('.heading1')
  h1Box.style.display = 'inline-block'
  const overlay = document.querySelector('.overlay')
  overlay.style.display = 'grid'
  overlay.appendChild(h1Box)
  // const option = e.target.dataset.drop
  // if (option === 'extLink') {
  //   h1Box.querySelector('.linkBoxTitle').innerHTML = "Unos spoljnog linka"
  //   h1Box.querySelector('#linkLang').parentElement.style.display = 'block'
  // }
  // else if (option === 'intLink') {
  //   h1Box.querySelector('.linkBoxTitle').innerHTML = "Unos bookmarka"
  //   h1Box.querySelector('#linkLang').parentElement.style.display = 'none'
  // }
}

export default (function loadH1Box() {
  const h1 = document.querySelector('.titleH1')
  h1.addEventListener('click', showH1Box)
})()

const submitH1Box = async (e) => {
  e.preventDefault()
  const details = {
    naslov: document.querySelector('#naslov').value,
    bookmark: document.querySelector('#bookmark').value,
    aria: document.querySelector('#aria').value,
    topNavOpis: document.querySelector('#topNavOpis').value,
    prvi: document.querySelector('#prvi').checked
  }
  document.querySelector('.overlay').style.display = 'none'
  insertSnippet(e, details)
}

const preRun = (() => {
  if (document.querySelector('.closeButtonH1'))
    document.querySelector('.closeButtonH1').addEventListener('click', closeH1Box)
  if (document.querySelector('.insertH1'))
    document.querySelector('.insertH1').addEventListener('click', submitH1Box)
})()