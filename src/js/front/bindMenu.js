export default function bindMenu() {
  const topMenu = document.querySelector(".headerBottom"),
    home = document.querySelector(".backHome"),
    indicator = document.querySelector('.indicator')

  if (document.body.scrollTop >= 70 || document.documentElement.scrollTop >= 70) {
    topMenu.classList.add("fixed-top")
    home.style.visibility = "visible"
    indicator.style.position = "fixed"
    indicator.style.top = '58px'
  }
  else {
    topMenu.classList.remove("fixed-top")
    home.style.visibility = "hidden"
    indicator.style.position = "relative"
    indicator.style.top = '-5px'
  }
}