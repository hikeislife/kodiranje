export default (function slowDown() {
  const details = document.querySelectorAll("details")
  
  details.forEach(det => {
    const summary = det.querySelector("summary")
    summary.addEventListener("click", function(e) {
      if (det.hasAttribute("open")) {
        e.preventDefault()
        det.id = "closeDetails"
        setTimeout(() => { 
          // only after the animation finishes, continue
          det.removeAttribute("open");
          det.id = ""
        }, 1000)

      }
    })
  })
})()