/* use data-ind on code element to indicate how many characters to indent */

export default (function indentCode() {
  const container = document.querySelectorAll('[data-ind]')

  container.forEach(x => {
    const ind = `&nbsp;`.repeat(x.dataset.ind)
    x.innerHTML = ind + x.innerHTML
  })
})()