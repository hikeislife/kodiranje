// export default function renderSideNav (kurs) {
//   if(kurs === undefined) kurs = 'mp'
//   const fetchItemList = `/api/getPubPostsInCourse/${kurs}` 

//   let listReq = new Request(fetchItemList, {
//     method: 'GET'
//   })

//   fetch(listReq)
//     .then(res => res.json())
//     .then(data => {
//       data.forEach(li => {
//         const element = document.createElement('li')
//         const anchor = document.createElement('a')
        
//         anchor.href = `/tut/${li.courseName}/${li.selectedURL}`
//         anchor.setAttribute('aria-label', li.navName)

//         element.id = li._id
//         element.innerHTML = li.navName
//         element.setAttribute('data-order', li.order)
//         anchor.appendChild(element)
//         const nav = document.querySelector('#side-menu')
//         nav.appendChild(anchor)

//       })
//     })
//     .catch((er) => { console.log(er) })
// }