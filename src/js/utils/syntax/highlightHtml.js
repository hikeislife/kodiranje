export default function highHTML (tag) {
  // if it's a TAG [str]< tag
  if(tag.match(/(.*?)&lt;(.*)*/g)) {
    const pos = tag.indexOf('&gt;')
    // there are two tags on the same line:
    if(tag.includes('&gt;', pos + 1)) {
      if (tag.indexOf('&lt;')) {
        // doesn't start with <
        // ... > ... </ ... >
        const tags = highHTML(tag.split('&gt;')[0])
        //str > str </ str >
        tag = tag.replace(/(.*)&gt;(.*)&lt;\/(.*)&gt;/g, `${tags}&gt;$2&lt;/<span class="pink">$3</span>&gt;`)
      }
      else {
        // starts with < ... > ... </ ... >
        tag = tag.replace(/&lt;(.*)&gt;(.*)&lt;\/(.*)&gt;/g, `&lt;<span class="pink">$1</span>&gt;$2&lt;/<span class="pink">$3</span>&gt;`)
      }
    } 
    else { // there's only one tag per line:
      // closing tag
      if (tag.match(/(.*)?&lt;\/(.*)*/g)) {
        tag = tag.replace(/(.*)?&lt;\/(.*)&gt;/, `$1&lt;/<span class="pink">$2</span>&gt;`)
      } // opening tag
      else if(tag.includes('&gt;')) { // simple tag
        tag = tag.replace(/&lt;(.*)&gt;(.*)/g, `&lt;<span class="pink">$1</span>&gt;$2`)
      } // tag with atributes
      else {
        tag = tag.replace(/&lt;(.*)/, `&lt;<span class="pink">$1</span>`)
      }
    }
  }
  // match atribute name:
  else if (tag.match(/(.*)="(.*)/g)) {
    tag = tag.replace(/(.*)="(.*)("|:|"&gt;)/g, `<span class="green">$1</span>="<span class="royal">$2</span>$3`)
  }
  // match value with units
  else if (tag.match(/([0-9])*(\.)?([0-9])?(rem|em|px|ch|vw|vh|%)(;)?(")?/g)) {
    tag = tag.replaceAll(/([0-9])*(\.)?([0-9])(rem|em|px|ch|vw|vh|%)(;)?(")?/g, `<span class="violet">$1</span>$2<span class="violet">$3</span><span class="pink">$4<span>$5$6`)
  } 
  //doctype edge case, will color any html and add it a >
  else if(tag === "html&gt;") tag = `<span class="violet">html</span>&gt;`
  // unmatched
  else {
    // console.log('%c ' + tag, ' color: #ff0000;')
  }
  return tag
}