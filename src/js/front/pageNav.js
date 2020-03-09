/*
 * colects all page titles and adds bookmarks to them at the start of the page
 */
export default function createPageNav () {
  const page = document.querySelector('.placeholder')
  const bookmarks = [...page.querySelectorAll('a[name]')]
  
  let navContent = ''
  bookmarks.forEach(x => {
    navContent += `
      <li><a href="#${x.attributes.name.nodeValue}" 
         aria-label="${x.attributes["aria-label"].nodeValue}" 
         rel="bookmark subsection" 
         hreflang="sr">
        ${x.attributes.title.nodeValue}
      </a></li>\n`
  })
  //console.log(navContent)
  if (page.querySelector('.page-nav > .listless'))
    page.querySelector('.page-nav > .listless').innerHTML = navContent
}