// TODO: treba da proverava da unos sa nekim od tih parametara ne postoji već. kao tag, title i sl
// TODO: treba i escape da se odradi

const fs = require('fs')
const rawEntry = require('./unos.js')
const request = require('request') //6.4
const validator = require('validator') //3.4

const entry = JSON.stringify(rawEntry)
const curentContents = fs.readFileSync('data.json');
const previousContent = curentContents.toString().substr(0, curentContents.length - 1)

//fs.writeFileSync('data.json', `${previousContent},${entry}]`)

//const rawEntry = { name: "bla", value: "mla" }
// const entryObj = {
//   courseId : rawEntry.courseId,
//   title    : rawEntry.title,
//   tag      : rawEntry.tag,
//   contents : rawEntry.contents
// }
//console.log(`${previousContent},${entry}]`)

// fs.writeFileSync('data.json', entry)


//const URL = 'https://raw.githubusercontent.com/hikeislife/kodiranje/master/js/content.json'
// request({ url: URL, json: true }, (er, res, body) => {
//   //const data = JSON.parse(body)
//   console.log(body)
// })