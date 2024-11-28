/*
 * colects all page titles and adds bookmarks to them at the start of the page
 */
export default function createPageNav() {
  const page = document.querySelector('article')
  const pos = document.querySelector('a h1')?.parentElement || ''
  let container


  /* This will replace obsolete classes instead of me,
  ** at some point in time I should be able to remove this if block,
  ** as when ever I edit the page through backend, 
  ** the old tag will permanently be replaced with the new one */
  // if (document.querySelector('.page-contents')) { // old
  //   container = document.querySelector('.page-contents')
  //   container.className = 'pageNav'
  //   container.innerHTML = ''
  // } else if (document.querySelector('.pageNav')) {
  //   container = document.querySelector('.pageNav') // new
  // } else if (document.querySelector('.page-nav')) {
  //   const deleteNav = document.querySelector('.page-nav')
  //   deleteNav.remove()
  //   container = document.querySelector('.referalTitle')
  //   container.innerHTML = ''
  //   container.className = 'pageNav'
  //   // document.querySelector('.pageContents').append(container)
  // }
  // else {
    container = document.createElement('div')
    container.className = 'pageNav'
  // }

  if (pos) // for pages like donation, where there's no h1
  pos.parentNode.insertBefore(container, pos.nextSibling)

  // add title, both for old and new
  if (page) {

    // add top of te page anchor here

    const title = document.createElement('div')
    title.className = 'referalTitle'
    title.innerHTML = `Sadržaj strane:`
    container.append(title)

    // add nav
    let referalList
    if (document.querySelector('.page-nav')) { // old
      referalList = document.querySelector('.page-nav')
      referalList.className = 'referalList'
      referalList.innerHTML = ''
    } else { // new
      referalList = document.createElement('nav')
      referalList.className = 'referalList'
    }
    container.append(referalList)

    // generate list of items
    let navContent = `<ul class="listless">`
    const bookmarks = [...page.querySelectorAll('a[name]')]
    bookmarks.forEach(x => {
      navContent += `
      <li class="pageNavItem referalItem">
        <a href="#${x.attributes.name.nodeValue}" 
           aria-label="${x.attributes["data-aria-label"]?.nodeValue || x.attributes["aria-label"].nodeValue}" 
           rel="bookmark subsection" 
           hreflang="sr"
           class="nocolor${x.attributes["data-aria-label"] ? '' : ' remindme'}">
          ${x.attributes.title?.nodeValue || x.dataset.title}
        </a>
      </li>\n`
    })
    navContent += `</ul>\n`
    referalList.innerHTML = navContent
  }
}