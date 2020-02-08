export default (function fixSelected() {
  const selectField = document.querySelector('select#courseName')
  const selectedOption = selectField.dataset.selected
  selectField.querySelectorAll('option').forEach(x => {
    if(x.value === selectedOption) x['selected'] = 'selected'
  })
})()