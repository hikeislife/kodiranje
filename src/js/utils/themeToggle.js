export default (function themeToggle() {
  const toggle = document.querySelector('.themeToggle')
  // const domain = `; domain=${window.location.hostname};`
  // console.log(domain)
  toggle.addEventListener('click', () => {
    if (toggle.parentElement.className === 'moon') {
      toggle.parentElement.classList.replace('moon', 'sun')
      document.querySelector('[rel="stylesheet"]').href = `./../../styles/style.css`
      document.cookie = `theme=style;path=/`
    } else {
      toggle.parentElement.classList.replace('sun', 'moon')
      document.querySelector('[rel="stylesheet"]').href = `./../../styles/dark.css`
      document.cookie = `theme=dark;path=/`
    }
  })
})()