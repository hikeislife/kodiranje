export default function bindMenu() {
  const topMenu = document.querySelector(".topNavWrapper")
  const home = document.querySelector(".backHome")
  const progress = document.querySelector('progress')

  const topBump = 64 
  const magicWidth = 768
  const currentWidth = topMenu.parentElement.scrollWidth

  if ((document.body.scrollTop >= topBump || document.documentElement.scrollTop >= topBump) && currentWidth >= magicWidth) {
    console.log(currentWidth)
    topMenu.classList.add("fixed-top")
    home.style.visibility = "visible"
    progress.style.display = "block"
    progress.style.position = "fixed"
    progress.style.top = '58px'
  }
  else {
    topMenu.classList.remove("fixed-top")
    home.style.visibility = "hidden"
    progress.style.top = '0px'
  }
}