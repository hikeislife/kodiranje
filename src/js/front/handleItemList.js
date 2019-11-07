import makeDragable from './makeDraggable.js'

export function getList() {
  return [...document.querySelectorAll('.added-items li')]
}


export default function updateItemList ()  {
  const ul = document.querySelector('.added-items')
  const publish = document.querySelector('label[for=publish]')
  const newCourse = document.querySelector('#newCourse')

  

  function setUlHeight () {
    ul.style.height = `${(getList()[0].clientHeight + 10) * getList().length }px`
  }

  function positionAbsolutes () {
    getList().forEach(li => {
      li.style.top = `${li.dataset.order * (li.clientHeight + 4)}px`
    })
    setUlHeight()
  }
  positionAbsolutes()

  const addNewItem = (() => {
    const ul = document.querySelector('.added-items')
    const newLi = document.createElement('li')
    newLi.classList.add('inactive-item')
    newLi.setAttribute('data-order', ul.childElementCount)
    newLi.setAttribute('draggable', true)
    newLi.id = "new"
    newLi.style.display = 'none'
    ul.appendChild(newLi)

    const fillNewLi = () => {
      newLi.style.display = 'inline-flex'
      newLi.innerHTML = newCourse.value
      if (!newCourse.value) {
        newLi.style.display = 'none'
      }
      positionAbsolutes()
    }

    if (publish.control.checked) newLi.classList.remove('inactive-item')
    else newLi.classList.add('inactive-item')

    publish.addEventListener('click', () => {
      if (publish.control.checked) {
        newLi.classList.add('inactive-item')
      }
      else {
        newLi.classList.remove('inactive-item')
      }
    })

    if (newCourse.value) {
      fillNewLi()
    }

    newCourse.addEventListener('keyup', () => {
      fillNewLi()
    })
  })();
}