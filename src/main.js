import bindMenu             from "./js/front/bindMenu.js"
import mobileSideNavHandler from './js/front/mobileSideNav.js'
import copyd                from "./js/front/copyDate.js"
import createPageNav        from "./js/front/pageNav.js"
import renderReferenceList  from "./js/front/renderReferenceList.js"

window.onscroll = () => bindMenu()
createPageNav()
renderReferenceList()