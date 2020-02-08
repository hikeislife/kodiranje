document.querySelector('.admin-warningButton').addEventListener('click', (e) => {
  fetch(`/admin/delete-admin/${e.target.dataset.adminId}`, {
    method: 'DELETE'
  }).then(() => window.location.href = `/admin/svi-admini`) 
})