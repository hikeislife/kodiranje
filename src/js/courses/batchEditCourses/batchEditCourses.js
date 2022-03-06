// import updateItemList from "./handleItemList"

// save button add click event
document.querySelector('#gumb').addEventListener('click', e => {
  e.preventDefault()
  console.log(window.location.pathname)
  
  // items that can be re-arranged 
  const list = [...document.querySelector('.added-items').children]
  const data = []
  let fetchUrl = ``
  
  // when save button is clicked, loop through all updateItemList, collect the new order and add them to the "data" array
  list.forEach(item => {
    // item.childNodes[3]) - div.adminInputCheckbox
    // childnode is the checkbox
    const itemObj = {
      _id: item.dataset.myId,
      order: item.dataset.order,
      active: item.childNodes[3].childNodes[1].checked,
      published: item.childNodes[3].childNodes[1].checked
    }
    data.push(itemObj)
  })

  console.dir(data)

  if (window.location.pathname.startsWith(`/admin/detalji-kursa/`)) {
    fetchUrl = `/admin/batchEditLessons/`
    console.log(fetchUrl)

  } else if (window.location.pathname.startsWith(`/admin/svi-kursevi/`)) {
    fetchUrl = `/admin/batchEditCourses/`
  }
  // save changes and redirect to list of all courses
  // #TODO: if these two screens are merged, it can't redirect to a page that is the same... so, redirect where?
  fetch(fetchUrl, {
    method: 'PATCH',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(() => window.location.href = `/admin/svi-kursevi/`)
})