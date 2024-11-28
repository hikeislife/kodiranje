import goLeft from "./goLeft.js"
import goRight from "./goRight.js"

export default function go (direction) {
  let current, total
  let ids = []
  const uris = []
  if (document.querySelector('.sideNav')) {
    const items = document.querySelectorAll('.sideNav ul .referalItem')
    
    const article = document.querySelector('article')

    items.forEach(item => {
      uris.push(item.childNodes[0].href)
      ids.push(item.id)
    })
    current = ids.indexOf(article?.dataset?.lesson) || 0
    total = ids.length

    if (direction == 'left') {
      goLeft(uris, current, total)
    }
    else if (direction == 'right') {
      goRight(uris, current, total)
    } 
    else {
      console.error('error ', direction)
    }
  }
}