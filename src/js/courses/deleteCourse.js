document.querySelector('#gumb').addEventListener('click', (e) => {
  fetch(`/admin/delete-course/${e.target.dataset.courseId}`, {
    method: 'DELETE'
  }).then(() => window.location.href = `/admin/svi-kursevi`) 
})