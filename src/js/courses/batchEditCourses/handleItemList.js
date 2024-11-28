import makeDragable from './makeDraggable.js'

export function getList() {
  return [...document.querySelectorAll('.added-items li')]
}

export default function updateItemList ()  {
  const ul = document.querySelector('.added-items')
  const publish = document.querySelectorAll('label[for]')
  
  function setUlHeight (maxOrder, max) {
    // this will move the element with too large order to up to the end of the list, solving the problem of element hanging out of the list, provided there's only one item with too large order
    if(maxOrder > getList().length) {
      max.dataset.order = getList().length
    }
    // height of individual elements times number of elements +
    // 32px for the block margins, +
    // number of elements times width of block borders
    // and additional 4 for the border of container
    ul.style.height = `
    ${getList()[0].clientHeight * getList().length
     + 32 
     + getList().length * 4 + 4}px`
  }

  /* 
   * Being positioned absolute, all li's stack up one on top of another,
   * this function spreads them out like they would normally be
   */
  const positionAbsolutes = () => {
    // when course is changed for a lesson it will keep the order from other course, and if it's smaller than total number of courses, it will be placed behind the other item with same order, so to avoid that, we check order for duplicates, and change duplicates order to the list length, as no item will have that order
    let checkOrderDuplicates = []
    // in case list item has too big order, either from deletion, or whatever, it would drop bellow the ul container, and be to hard to drag, this way it will remain part of the list 
    let max, maxOrder = 0
    const totalItems = getList().length
    getList().forEach(li => {
      if(li.dataset.order > maxOrder) {
        maxOrder = li.dataset.order
        max = li
      }
      if(checkOrderDuplicates.includes(li.dataset.order)) {
        li.dataset.order = totalItems
      }
      checkOrderDuplicates.push(li.dataset.order)
      li.style.top = `${li.dataset.order * (li.clientHeight + 4)}px`
    })
    setUlHeight(maxOrder, max)
  }
  positionAbsolutes()

  const handleListClicks = (() => {
    publish.forEach(check => {
      const currentLi = check.parentElement.parentElement
      check.addEventListener('click', () => {
        if (!check.control.checked) {
          currentLi.classList.remove('inactive-item')
        }
        else {
          currentLi.classList.add('inactive-item')
        }
      })
    })
  })();
}