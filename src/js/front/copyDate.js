export default (function () {
  const showCurrentYear = new Date().getFullYear();
  document.querySelector('.copydate').innerHTML = `&copy; ČĎŠ  ${showCurrentYear}`;
})();