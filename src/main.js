import bindMenu from "./js/front/bindMenu.js"
import mobileSideNavHandler from './js/front/mobileSideNav.js'
import copyd from "./js/front/copyDate.js"
import renderReferenceList from "./js/utils/renderReferenceList.js"
import createPageNav from "./js/utils/pageNav.js"
import backToTop from "./js/front/backToTop.js"
import scrollPos from "./js/utils/progressBar.js"
import indentCode from "./js/utils/indentCode.js"
//import register             from "./js/serviceWorker/register.js"
import themeToggle from "./js/utils/themeToggle.js"
import loadTheme from "./js/utils/loadTheme.js"
import homePageBoxLeveling from "./js/front/homePageBoxLeveling.js"
import slowDownDetails from "./js/utils/slowDownDetails.js"
import selectSideNav from "./js/utils/selectSideNav.js"
import syntaxHL from "./js/utils/syntax/syntaxHL.js"
import sideways from "./js/utils/sideways/sidewaysNav.js"
import swipe from "./js/utils/sideways/swipe.js"

window.onscroll = () => bindMenu()
renderReferenceList()
createPageNav()
homePageBoxLeveling()
window.addEventListener('resize', homePageBoxLeveling)