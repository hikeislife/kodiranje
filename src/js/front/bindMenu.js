export default function bindMenu () {
  const topMenu = document.querySelector("#header-bottom"),
        home = document.querySelector("#backhome")

  if (document.body.scrollTop >= 70 ||document.documentElement.scrollTop >= 70) {
    topMenu.className = "fixed-top";
    home.style.visibility = "visible";
  }
  else {
    topMenu.className = "";
    home.style.visibility = "hidden";
  }
}