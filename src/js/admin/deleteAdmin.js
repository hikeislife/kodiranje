document.querySelector('.deleteButton').addEventListener('click', (e) => {
  fetch(`/admin/delete-admin/${e.target.dataset.adminId}`, {
    method: 'DELETE',
  }) 
})