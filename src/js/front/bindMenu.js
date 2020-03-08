export default function bindMenu () {
  const topMenu = document.querySelector("#header-bottom"),
        home = document.querySelector("#backhome"),
        indicator = document.querySelector('.indicator')

  if (document.body.scrollTop >= 70 ||document.documentElement.scrollTop >= 70) {
    topMenu.className = "fixed-top";
    home.style.visibility = "visible";
    indicator.style.position = "fixed"
    indicator.style.top = '58px'
  }
  else {
    topMenu.className = "";
    home.style.visibility = "hidden";
    indicator.style.position = "relative"
    indicator.style.top = '-5px'
  }
}