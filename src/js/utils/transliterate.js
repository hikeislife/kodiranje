// Serbian "spelling" rules require transcription of english words, or they need to be written as they are spoken, phonetically. This tends to look really awkward, so, this switches transcribed words to transliterated and vice versa.

// #TODO: add this to cookie

const switchTransliteration = () => {
  const switches = document.querySelectorAll('[data-trans]')
  

  switches.forEach(sw => {
    const temp = sw.innerHTML
    sw.innerHTML = sw.dataset.trans
    sw.setAttribute('data-trans', temp)
  })
}

(() => {
  switchTransliteration()
})()

