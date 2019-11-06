

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()
  
  const course2Add = JSON.stringify({
    name   : document.querySelector('#newCourse').value.trim(),
    setId  : document.querySelector('#newCourse').value.trim().toLowerCase().replace(/ /gi, '-'),
    active : document.querySelector('[for=publish]').control.checked,
    //order  : 
  })
  console.log('dodavanje kursa', JSON.parse(course2Add))
})
fetch('/admin/getAllCourses', {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Content-length': '50Mb'
  }
}).then((list) => {
  list.forEach(l => console.log(l.name))
})
.catch((er) => {console.log(er)})
/* TODO:
treba iz baze povući sve ostale kurseve sa redosledom i popisati ih na ekranu, podesti da redosed novog kursa bude 
increment već postojećih kuseva

videti kako da se mogu drag and droppovati da im se promeni order */