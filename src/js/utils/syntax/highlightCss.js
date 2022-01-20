export default function highCSS(code) {
  let line = code.innerHTML

  if (line.match(/(\.|#)(.*?) {/g)) {
    line = line.replace(/(\.|#)(.*?) {/g, `<span class="green">$1$2</span> {`)
  }
 
  if(line.match(/(.*?): (.*?);/g)) {
    if(line.match(/(.*?): [^0-9](.*?);/g)) {
      line = line.replace(/(.*?): (.*?);/g, `<span class="royal">$1</span>: <span class="violet">$2</span>;`)
    } else {
      line = line.replace(/(.*?): ([0-9]*)(.*?);/g, `<span class="royal">$1</span>: <span class="violet">$2</span><span class="pink">$3</span>;`)
    }
  }
  return line
}