export default (function loadTheme() {
  const cookies = document.cookie
  const toggle = document.querySelector('.themeToggle')
  const url = `./../../styles/`
  const ext = `.css`
  console.log(cookies)
  if (cookies.split('=')[1] === 'style') {
    document.querySelector('[rel="stylesheet"]').href = `${url}style${ext}`
    toggle.parentElement.classList.replace('moon', 'sun')
  }
  else if (cookies.split('=')[1] === 'dark') {
    document.querySelector('[rel="stylesheet"]').href = `${url}dark${ext}`
    toggle.parentElement.classList.replace('sun', 'moon')
  }
})()