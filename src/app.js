const path = require('path')
const express = require('express')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const mongo = require('mongodb')

const MongoClient = mongo.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const database = 'kodiranje'

const port = process.env.PORT || 80

const app = new express()
const dir = path.join(__dirname)
const views = path.join(__dirname, 'views')

app.set('view engine', 'hbs')
app.set('views', views)
hbs.registerPartials(views)

app.use(express.static(dir))
app.use(bodyParser.json())
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

app.post('/admin/addPost', (req, res) => {
  MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) { return console.log('Nema mongo baze :(') }
    const db = client.db(database)
    db.collection('articles').insertOne(JSON.stringify(req.body), (er, res) => {
      if (er) {
        return res.send('neuspeh pri unosu članka')
      }
      res.send('done')
    })
  })
})

app.get('*', (req, res) => {
  res.render('404')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})