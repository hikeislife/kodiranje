const path = require('path')
const express = require('express')
const hbs = require('hbs')
//import 'styles/style.scss'

const app = new express()
const dir = path.join(__dirname)
const views = path.join(__dirname, 'views')

app.set('view engine', 'hbs')
app.set('views', views)
hbs.registerPartials(views)

app.use(express.static(dir))
console.log(dir)


app.get('', (req, res) => {
  //res.send(dir + '/index.html')
  res.render(path.join('index'), {
    title: "Kodiranje"
  })
})

app.get('/kursevi', (req, res) => {
  if(!req.query.kurs) {
    return res.send({error: 'niste izabrali kurs'})
  } /*else if (!req.query.lekcija) {
    return res.send({greška: 'niste izabrali lekciju'})
  }*/
  console.log(req.query)
  res.send({
    kurs: req.query.kurs,
    lekcija: req.query.lekcija || 'uvod'
  })
})

app.get('/recnik', (req, res) => {
  res.send('rečnik')
})

app.get('/recnik/*', (req, res) => {
  res.send('Članak nije pronađen')
})

app.get('/admin', (req, res) => {
  res.render('admin/')
})

app.get('*', (req, res) => {
  res.send('404')
})

const port = 80
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})