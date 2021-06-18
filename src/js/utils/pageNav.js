/*
 * colects all page titles and adds bookmarks to them at the start of the page
 */
export default function createPageNav() {
  const page = document.querySelector('.placeholder')
  const bookmarks = [...page.querySelectorAll('a[name]')]


  /* This will replace obsolete classes instead of me, 
  ** at some point in time I should be able to remove this if block, 
  ** as when ever I edit the page through backend, 
  ** the old tag will permanently be replaced with the new one */
  let container
  if (document.querySelector('.page-contents')) { // old
    container = document.querySelector('.page-contents')
    container.className = 'pageNav'
    container.innerHTML = ''
  } else if (document.querySelector('.pageNav')) {
    container = document.querySelector('.pageNav') // new
  } else if (document.querySelector('.page-nav')) {
    const deleteNav = document.querySelector('.page-nav')
    deleteNav.remove()
    container = document.querySelector('.referalTitle')
    container.innerHTML = ''
    container.className = 'pageNav'
    // document.querySelector('.pageContents').append(container)
  }

  // add title, both for old and new

  if (container) {
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
    let navContent = ''
    bookmarks.forEach(x => {
      //title ? 
      navContent += `
    <ul class="listless">
      <li class="pageNavItem referalItem">
        <a href="#${x.attributes.name.nodeValue}" 
           aria-label="${x.attributes["aria-label"].nodeValue}" 
           rel="bookmark subsection" 
           hreflang="sr"
           class="nocolor">
          ${x.attributes.title?.nodeValue || x.dataset.title}
        </a>
      </li>\n
    </ul>\n`
    })
    referalList.innerHTML = navContent
  }






}