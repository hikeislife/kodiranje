export default (function selectSideNav() {
  const article = document.querySelector('article')
  const sideItems = document.querySelectorAll('.sideMenu li')
  const lesson = article?.dataset?.lesson || ''

  sideItems.forEach(item => {
    if(item.id === lesson) {
      item.classList.add('active')
    }
  })
})()