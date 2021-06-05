/* use data-ind to indicate how many rem to indent */

export default (function indentCode() {
  const toBeIndented = document.querySelectorAll("[data-ind]")
  toBeIndented.forEach(x => {
    x.style.textIndent = `${x.dataset.ind * .6}em`
  })

})()