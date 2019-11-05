const path = require('path')
const express = require('express')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const mongo = require('mongodb')
const port = process.env.PORT || 80

const MongoClient = mongo.MongoClient
const connectionURL = 'mongodb://127.0.0.1:27017'
const database = 'kodiranje'
MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) { return console.log('Nema mongo baze :(') }
  return db = client.db(database)
})

const app = new express()
const dir = path.join(__dirname)
const views = path.join(__dirname, 'views')

app.set('view engine', 'hbs')
app.set('views', views)
app.set('view options', {layout: 'index'})
hbs.registerPartials(views)

app.use(express.static(dir))
app.use(bodyParser.json({ 
  parameterLimit: 10000000,
  limit: '50mb', 
  type: 'application/json' 
}))
app.use(bodyParser.urlencoded({ 
  parameterLimit: 10000000,
  extended: true,
  limit: '50mb'
}))



app.get('', (req, res) => {
  res.render('home', {
    title: "Kodiranje"
  })
})

/* ADMIN */
app.get('/admin', (req, res) => {
  res.render('admin/unos' , {title: "dodaj kurs"})
})

app.post('/admin/addPost', (req, res) => {
  db.collection('articles').insertOne(req.body, (er, res) => {
    if (er) {
      return console.log('er')
    }
  })
  res.send('done')
})




app.get('/:kurs/:lekcija', (req, res) => {
  db.collection('articles').findOne({ 
    courseName: req.params.kurs,
    selectURL : req.params.lekcija
  }, (er, rez) => {
  if(er) {
    return console.log('Ne nalazim taj tutorijal :(')
  } else if (rez === null) {
    return res.render('404')
  }
  let data = {
    googTitle : rez.googTitle,
    socTitle : rez.socTitle,
    articleContent : rez.articleContent,
    courseName : rez.courseName,
    googDesc : rez.googDesc,
    socDesc : rez.socDesc,
    publish : rez.publish,
    tags : rez.tags,
    created: rez.created,
    edited : rez.edited,
    author : rez.author,
  } 
   
  res.render('kurs', { ...data })
  })
})

// app.get('/recnik', (req, res) => {
//   res.send('rečnik')
// })

// app.get('/recnik/*', (req, res) => {
//   res.send('Članak nije pronađen')
// })



app.get('*', (req, res) => {
  res.render('404', {
    title: "Kodiranje"
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

//const { MongoClient, ObjectID } = require('mongodb')

//const id = new ObjectID()
//console.log(id)

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

  //console.log(res.author)
  // res.send({
  //   kurs: req.params.kurs,
  //   lekcija: req.params.lekcija || 'uvod'
  // })//console.log(req.params)
  // if(!req.params.kurs) {
  //   return res.send({error: 'niste izabrali kurs'})
  // } 
  // else if (req.params.kurs == 'admin') {
  //   return req.params.lekcija = 'uvod'
  // }

  //console.log(db)