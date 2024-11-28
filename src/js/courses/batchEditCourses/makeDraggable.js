// #NOTE:
// ul needs to have  .added-items
// li's need to have data-order=""
//                   data-my-id=""
//                   draggable="true"

import updateItemList, { getList } from './handleItemList.js'

updateItemList()

// index at which the element is being dropped
let newIndex = 0

export default function makeDraggable () {

  // initial index of dragged element
  let index

  // #NOTE: getList finds all draggable li elements
  getList().forEach(li => {
    li.addEventListener('dragstart', (e) => {
      // e.target.classList.add('dragged')
      index = Number(e.target.dataset.order)
    })
    li.addEventListener('dragover', (e) => {
      newIndex = Number(e.target.dataset.order)
    })
    li.addEventListener('dragend', (e) => {
      // e.target.classList.remove('dragged')
      reorderItems(index)
    })
  })
}
makeDraggable()

function reorderItems(index) {
  const liHeight = getList()[0].clientHeight + 4

  // #NOTE:  dragging element up
  if (index > newIndex) {

    // #NOTE: gets top position of the location element was dropped at
    const newPos = document.querySelector(`[data-order="${newIndex}"`).style.top
    
    getList().forEach(li => {
      // #NOTE: Element which is being dragged
      if (li.dataset.order == index) {
        li.style.top = newPos
        li.removeAttribute('data-order')
        li.setAttribute('data-order', newIndex)
      }
      
      // #NOTE: Elements which were above, but are now below the dragged element so, order becomes +1
      else if (li.dataset.order >= newIndex && li.dataset.order < index) { // other affected elements

        // #NOTE: takes just the number potion of the top position, i.e. stripps down the "px"
        const currentLiPosition = Number(li.style.top.substring(0, (li.style.top.length - 2)))
        li.style.top = `${currentLiPosition + liHeight}px`

        // #NOTE: new order is old order + 1 cause you can only drag one element at the time
        li.setAttribute('data-order', `${Number(li.dataset.order) + 1}`)

      }
    })
  }
  // #NOTE: dragging element down
  else if (index < newIndex) {
    const newPos = document.querySelector(`[data-order="${newIndex}"`).style.top

    getList().forEach(li => {
      
      let newOrder = `${Number(li.dataset.order) - 1}`

      if (li.dataset.order == index) { // Element which is being dragged set to temp so it isn't moved twice
        li.setAttribute('data-order', "temp")
      }
      
      if (li.dataset.order > index && li.dataset.order <= newIndex) { // other affected elements
        const currentLiPosition = Number(li.style.top.substring(0, (li.style.top.length - 2)))
        li.style.top = `${currentLiPosition - liHeight}px`
        li.setAttribute('data-order', newOrder)
      }

      if (li.dataset.order == 'temp') { // element which is being dragged
        li.style.top = newPos
        li.setAttribute('data-order', `${newIndex}`)
      }
    })
  }
}

// function allowDrop(ev) {
//   ev.preventDefault();
// }