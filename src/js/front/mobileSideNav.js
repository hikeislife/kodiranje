// Side nav handler for mobile
export default (() => {
  // hides menu on outside click:
  window.onmouseup = () => document.querySelector("#side-nav").style.display = "none";

  // adding mobile menu to the cog click
  document.querySelector("#mobile-cog").addEventListener("click", loadMenu);

  // toggles mobile menu on cog click
  function loadMenu() {
    let menuStatus = document.getElementById("side-nav");

    if (menuStatus.style.display.match("block")) {
      menuStatus.style.display = "none";
    }
    else {
      menuStatus.style.display = "block";
    }
  }
})();