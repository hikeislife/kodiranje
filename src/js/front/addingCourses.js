import updateItemList from './handleItemList.js'
import makeDragable from './makeDraggable.js'


const handlePage = (() => {
  const fetchPreviouslyAddedItems = "/api/getAllCourses/"

  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()
  
    const course2Add = JSON.stringify({
      name   : document.querySelector('#newCourse').value.trim(),
      setId  : document.querySelector('#newCourse').value.trim().toLowerCase().replace(/ /gi, '-'),
      active : document.querySelector('[for=publish]').control.checked,
      order  : Number(document.querySelector('#new').dataset.order)
    })
    console.log('dodavanje kursa', JSON.parse(course2Add))

    fetch('/api/addNewCourse', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Content-length': '50Mb'
      },
      body: course2Add
    }).then((r) => {
      console.log('course submited', r)
    }).catch((e) => {
      console.log('greška', e)
    }) 
  })

  let req = new Request(fetchPreviouslyAddedItems, {
    method: 'GET'
  })
  fetch(req).then(res => res.json())
  .then(data => { 
    const box = document.querySelector('.prevAdded')
    const ul = document.createElement('ul')
    ul.classList.add('added-items', 'listless')
    box.appendChild(ul)
    data.forEach(i => {
      const li = document.createElement('li')
      li.id = i.setId
      li.setAttribute('name', i.setId)
      li.setAttribute('draggable', true)
      li.setAttribute('data-db', i._id)
      li.setAttribute('data-order', i.order)
      li.innerHTML = i.name

      if(!i.active) {
        li.classList.add('inactive-item')
      }
      ul.appendChild(li)
    })
  }).then(() => updateItemList())
    .then(() => makeDragable())
  .catch((er) => {console.log(er)})

  
})();




/* TODO:
videti kako da ne može dva puta da submituje inače ode mas u propas
*/