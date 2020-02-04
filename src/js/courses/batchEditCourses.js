document.querySelector('#gumb').addEventListener('click', e => {
  e.preventDefault()
  
  const list = [...document.querySelector('.added-items').children]
  const data = []
  
  list.forEach(item => {
    //console.log(item.childNodes[1].childNodes[1].checked)
    const itemObj = {
      _id: item.dataset.courseId,
      order: item.dataset.order,
      active: item.childNodes[1].childNodes[1].checked
    }
    data.push(itemObj)
  })
  fetch('/admin/batchEditCourses', {
    method: 'PATCH',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  //console.log(JSON.stringify(data))
})