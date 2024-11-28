export default function bindMenu() {
  const topMenu = document.querySelector(".topNavWrapper")
  const home = document.querySelector(".backHome")
  const progress = document.querySelector('progress')

  const topBump = 64 
  const magicWidth = 768
  const currentWidth = topMenu.parentElement.scrollWidth
  const progressBump = `66px` //66px


  if ((document.body.scrollTop >= topBump || document.documentElement.scrollTop >= topBump) && currentWidth >= magicWidth) {
    topMenu.classList.add("fixed-top")
    home.style.visibility = "visible"
    progress.style.display = "block"
    progress.style.position = "fixed"
    progress.style.top = progressBump
  }
  else {
    topMenu.classList.remove("fixed-top")
    home.style.visibility = "hidden"
    progress.style.top = '0px'
  }
}