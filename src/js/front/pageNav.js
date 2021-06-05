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
  if (document.querySelector('.page-contents')) {
    const changeClass = document.querySelector('.page-contents')
    changeClass.className = 'referalTitle'
  }


  let navContent = ''
  bookmarks.forEach(x => {
    navContent += `
      <li class="pageNavItem referalItem">
        <a href="#${x.attributes.name.nodeValue}" 
           aria-label="${x.attributes["aria-label"].nodeValue}" 
           rel="bookmark subsection" 
           hreflang="sr"
           class="nocolor">
          ${x.attributes.title.nodeValue}
        </a>
      </li>\n`
  })
  //console.log(navContent)
  if (page.querySelector('.page-nav > .listless'))
    page.querySelector('.page-nav > .listless').innerHTML = navContent
}