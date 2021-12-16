export default function homePageBoxLeveling() {
  if(document.querySelector('.courseCard')) {
    const boxes = document.querySelectorAll('.courseCard')

    const allBoxes = []

    boxes.forEach(box => {
      box.style.height = 'fit-content'
    })

    boxes.forEach(box => {
      allBoxes.push(box.clientHeight)
    })

    console.log(allBoxes)
    const max = Math.max(...allBoxes)

    boxes.forEach(box => {
      box.style.height = `${max}px`
    })
  }
}