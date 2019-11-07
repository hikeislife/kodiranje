const fetchPost = "/api/getPost/:kurs/:lekcija"
const fetchNav = "/api/getPubPostsInCourse/:kurs"

let postReq = new Request(fetchPost, {
  method: 'GET'
})
fetch(postReq)
.then(res => res.json())
.then(data => {
  console.log(data)
    // const box = document.querySelector('.prevAdded')
    // const ul = document.createElement('ul')
    // ul.classList.add('added-items', 'listless')
    // box.appendChild(ul)
    // data.forEach(i => {
    //   const li = document.createElement('li')
    //   li.id = i.setId
    //   li.setAttribute('name', i.setId)
    //   li.setAttribute('draggable', true)
    //   li.setAttribute('data-db', i._id)
    //   li.setAttribute('data-order', i.order)
    //   li.innerHTML = i.name

    //   if (!i.active) {
    //     li.classList.add('inactive-item')
    //   }
    //   ul.appendChild(li)
  })
  // .then(() => updateItemList())
  // .then(() => makeDragable())
  .catch((er) => { console.log(er) })
