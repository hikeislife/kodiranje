import bindMenu             from "./js/front/bindMenu.js"
import mobileSideNavHandler from './js/front/mobileSideNav.js'
import copyd                from "./js/front/copyDate.js"
import createPageNav        from "./js/front/pageNav.js"
import renderReferenceList  from "./js/front/renderReferenceList.js"
import backToTop            from "./js/front/backToTop.js"
import scrollPos            from "./js/utils/scrollPosIndicator.js"

window.onscroll = () => bindMenu()
createPageNav()
renderReferenceList()