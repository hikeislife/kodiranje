import updateItemList, { getList } from './handleItemList.js'

updateItemList()

let newIndex = 0;
export default function makeDraggable () {
  console.log(getList())
  let index
  getList().forEach(li => {
    // console.log(li)
    li.addEventListener('click', e => {console.log('click')})
    li.addEventListener('dragstart', (e) => {
      e.target.classList.add('dragged')
      console.log(e.target)
      index = Number(e.target.dataset.order)
    })
    li.addEventListener('dragover', (e) => {
      console.log('drag over')
      newIndex = Number(e.target.dataset.order)
    })
    li.addEventListener('dragend', (e) => {
      console.log('drag end')
      e.target.classList.remove('dragged')
      reorderItems(index)
    })
  })
}
makeDraggable()

function reorderItems(index) {
  const liHeight = getList()[0].clientHeight + 4

  if (index > newIndex) { // dragging element up
    const newPos = document.querySelector(`[data-order="${newIndex}"`).style.top
    
    getList().forEach(li => {

      let newOrder = Number(li.dataset.order) + 1
      
      if (li.dataset.order == index) { // Element which is being dragged
        li.style.top = newPos
        li.removeAttribute('data-order')
        li.setAttribute('data-order', newIndex)
      }

      else if (li.dataset.order >= newIndex && li.dataset.order < index) { // other affected elements
        const currentLiPosition = Number(li.style.top.substring(0, (li.style.top.length - 2)))
        li.style.top = `${currentLiPosition + liHeight}px`
        li.setAttribute('data-order', `${newOrder}`)
      }
    })
  }

  else if (index < newIndex) { // dragging element down
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

function allowDrop(ev) {
  ev.preventDefault();
}