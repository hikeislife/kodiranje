import { getList } from './handleItemList.js'

let newIndex = 0;
export default function makeDragable() {
  const list = [...document.querySelectorAll('.added-items li')]
  let index
  list.forEach(li => {
    li.addEventListener('dragstart', (e) => {
      index = e.target.dataset.order
    })
    li.addEventListener('drop', (e) => {
      console.log('ikada?')
    })
    li.addEventListener('dragover', (e) => {
      newIndex = e.target.dataset.order
    })
    li.addEventListener('dragend', (e) => {
      reorderItems(index)
    })
  })
}

function reorderItems(index) {

  index = Number(index), newIndex = Number(newIndex)
  const newPos = document.querySelector(`[data-order="${newIndex}"`).style.top

  if (index > newIndex) {
    const newPos = document.querySelector(`[data-order="${newIndex}"`).style.top

    getList().forEach(li => {

      let newN = Number(li.dataset.order) + 1

      if (li.dataset.order == index) {
        li.style.top = newPos
        li.removeAttribute('data-order')
        li.setAttribute('data-order', newIndex)
      }

      else if (li.dataset.order >= newIndex && li.dataset.order < index) {
        li.style.top = `${Number(li.style.top.substring(0, (li.style.top.length - 2))) + getList()[0].clientHeight + 4}px`
        li.setAttribute('data-order', `${newN}`)
      }
    })
  }
  else if (index < newIndex) {
    const newPos = document.querySelector(`[data-order="${newIndex}"`).style.top

    getList().forEach(li => {

      let newN = `${Number(li.dataset.order) - 1}`

      if (li.dataset.order == index) {
        li.setAttribute('data-order', "temp")
      }

      if (li.dataset.order > index && li.dataset.order <= newIndex) {
        li.style.top = `${Number(li.style.top.substring(0, (li.style.top.length - 2))) - getList()[0].clientHeight - 4}px`
        li.setAttribute('data-order', newN)
      }

      if (li.dataset.order == 'temp') {
        li.style.top = newPos
        li.setAttribute('data-order', `${newIndex}`)
      }
    })
  }
}