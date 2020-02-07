import makeDragable from './makeDraggable.js'

export function getList() {
  return [...document.querySelectorAll('.added-items li')]
}

export default function updateItemList ()  {
  const ul = document.querySelector('.added-items')
  const publish = document.querySelectorAll('label[for]')
  
  function setUlHeight () {
    ul.style.height = `${(getList()[0].clientHeight + 8) * getList().length }px`
  }

  /* 
   * Being positioned absolute, all li's stack up one on top of another,
   * this function spreads them out like they would normally be
   */
  const positionAbsolutes = () => {
    getList().forEach(li => {
      li.style.top = `${li.dataset.order * (li.clientHeight + 4)}px`
    })
    setUlHeight()
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