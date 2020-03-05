export default function displayOGFileName (name) {
  document.querySelector('label[for="socImage"]').innerHTML = `Slika za društvene mreže 1200x630px sa banerom
  <p>${name}</p>`
}