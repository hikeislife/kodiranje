// Side nav handler for mobile
export default (() => {
  const nav = document.querySelector('.sideNav')
  const cog = document.querySelector('.logo-cog')
  let handler

  const closeMenu = () => {
    nav.style.display = 'none'
    window.removeEventListener('click', closeMenu)
  }

  const mobMenuHandler = () => {
    const displayState = nav.style.display
    if (displayState == 'none') {
      nav.style.display = 'block'
      setTimeout(() => {
        window.addEventListener('click', closeMenu)
      }, 1000);

    } else {
      nav.style.display = 'none'
    }
  }

  (handler = function () {
    const width = window.innerWidth

    if (width < 768) {
      nav.style.display = 'none'
      cog.addEventListener('click', mobMenuHandler)
    }
    else if (width => 768) {
      nav.style.display = 'block'
      window.removeEventListener('click', closeMenu)
      cog.removeEventListener('click', mobMenuHandler)
    }

    window.onresize = handler
  })()





})();


// // hides menu on outside click:
//   window.onmouseup = () => document.querySelector(".sideNav").style.display = "none";

//   // adding mobile menu to the cog click
//   document.querySelector("#mobile-cog").addEventListener("click", loadMenu);

//   // toggles mobile menu on cog click
//   function loadMenu() {
//     let menuStatus = document.querySelector(".sideNav");

//     if (menuStatus.style.display.match("block")) {
//       menuStatus.style.display = "none";
//     }
//     else {
//       menuStatus.style.display = "block";
//     }
//   }