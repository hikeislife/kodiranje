import bindMenu from "./js/front/bindMenu.js"
import mobileSideNavHandler from './js/front/mobileSideNav.js'
import copyd from "./js/front/copyDate.js"
import renderReferenceList from "./js/utils/renderReferenceList.js"
import createPageNav from "./js/utils/pageNav.js"
import backToTop from "./js/front/backToTop.js"
import scrollPos from "./js/utils/scrollPosIndicator.js"
import indentCode from "./js/utils/indentCode.js"
//import register             from "./js/serviceWorker/register.js"
import themeToggle from "./js/utils/themeToggle.js"
import loadTheme from "./js/utils/loadTheme.js"
import homePageBoxLeveling from "./js/front/homePageBoxLeveling.js"

window.onscroll = () => bindMenu()
renderReferenceList()
createPageNav()
homePageBoxLeveling()
window.addEventListener('resize', homePageBoxLeveling)

// const url = `https://raw.githubusercontent.com/Fyrd/caniuse/main/data.json`

// const response = await fetch(url)

// const data = await response.json()

// const query = `promises`

// const firefox = data.data[query].stats.firefox
// console.log(firefox)

// let pb = 90, pt = 2, ab = 90, at = 2, yb = 90, yt = 2

// for (const version in firefox) {

//   if (firefox[version] == 'p') {
//     if (Number(version) > pt) pt = version
//     if (Number(version) < pb) pb = version
//   }

//   if (firefox[version] == 'a') {
//     if (Number(version) > at) at = version
//     if (Number(version) < ab) ab = version
//   }

//   if (firefox[version] == 'y') {
//     if (Number(version) > yt) yt = version
//     if (Number(version) < yb) yb = version
//   }

// }
// console.log(`This feature is not supported by versions ${pb} - ${pt}`)

// console.log(`This feature is partially supported by versions ${ab} - ${at}`)

// console.log(`This feature is fully supported by versions ${yb} - ${yt}`)