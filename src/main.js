import bindMenu from "./js/front/bindMenu.js";
import mobileSideNavHandler from './js/front/mobileSideNav.js'
import copyd from "./js/front/copyDate.js";
import pageNav from "./js/front/pageNav.js";
import renderSideNav from "./js/front/renderSideNav.js";


window.onscroll = () => bindMenu()
 
const setCourse = (() => {
  const url = document.URL.split('/')
  if (url.length <= 4) return renderSideNav('mp')
  if (url.includes('tut')) return renderSideNav(url[4])
})();
