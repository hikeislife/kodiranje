export default (function highlight () {
  const high = document.querySelectorAll('.high')
  high.forEach(h => {
  const highColor = h.attributes.class.value.slice(5)
    const broken = h.innerHTML.split(' ')
    let rejoined = ``
    broken.forEach(b => {
      b = `<span class="high${highColor}"><span>${b}</span></span>`
      rejoined += b
    })
    h.innerHTML = rejoined
  })
  let greens = document.querySelectorAll('.highGreen')
  let pinks = document.querySelectorAll('.highPink')
  let yellows = document.querySelectorAll('.highYellow')
})()