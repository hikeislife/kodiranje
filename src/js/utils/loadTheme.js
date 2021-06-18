export default (function loadTheme() {
  const cookies = document.cookie
  // console.group(cookies)
  const toggle = document.querySelector('.themeToggle')
  const url = `./../../styles/`
  const ext = `.css`
  cookies.split(';').forEach(x => {
    if (x.split('=')[1] === 'style') {
      document.querySelector('[rel="stylesheet"]').href = `${url}style${ext}`
      toggle.parentElement.classList.replace('moon', 'sun')
    }
    else if (x.split('=')[1] === 'dark') {
      document.querySelector('[rel="stylesheet"]').href = `${url}dark${ext}`
      toggle.parentElement.classList.replace('sun', 'moon')
    }
  })
})()