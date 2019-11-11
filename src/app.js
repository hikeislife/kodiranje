const express    = require('express')
const path       = require('path')
const hbs        = require('hbs')
const bodyParser = require('body-parser')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');


const adminApiRouter = require('./routers/adminApi.js')
const adminRouter = require('./routers/admin.js')

//require('./db/mongoose')
const Admin      = require('./db/models/admin')
const Article    = require('./db/models/article')
const Course     = require('./db/models/course')

const app        = new express()
const port       = process.env.PORT || 80
const dir        = path.join(__dirname)
const views      = path.join(__dirname, 'views')

app.set('view engine', 'hbs')
app.set('views',        views)
app.set('view options', { layout: 'index' })
hbs.registerPartials(views)

const options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,
  database: process.env.DB_NAME
}
app.use(session({
  secret: 'kodiranje',
  resave: false,
  saveUninitialized: true,
  //store: new MongoStore(options)
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(express.static(dir))
app.use(express.static('./js/front'))
app.use(bodyParser.json({ 
  parameterLimit : 10000000,
  limit          : '50mb', 
  type           : 'application/json' 
}))
app.use(bodyParser.urlencoded({ 
  parameterLimit : 10000000,
  extended       : true,
  limit          : '50mb'
}))
app.use((er, req, res, text) => {
  console.error(er.stack)
  res.status(500)
  res.render('500')
})
app.use(adminApiRouter)
app.use(adminRouter)

// const f = () => {
//   const token = jwt.sign({_id: 5}, 'kodiranje', { expiresIn: '1m' })
//   console.log(token)
//   const isVerified = jwt.verify(token, 'kodiranje')
//   console.log(isVerified)
// }
// f()

/* PATHS */
/* front page */
app.get('', (req, res) => {
  res.render('home', {
    title: "Kodiranje"
  })
})

app.get('/tut/:kurs/:lekcija', (req, res) => {
  Article.findOne({ courseName: req.params.kurs, selectedURL: req.params.lekcija }).select('-__v -published -_id').then((post) => {
    Article.find({ courseName: req.params.kurs, published: true }).sort({ order: 1 }).select('_id navName selectedURL ').then(menu => {
      if(!menu) {
        return res.status(404).send()
      }
      res.render('article', { 
        menu,
        googTitle: post.googTitle,
        googDesc: post.googDesc,
        socDesc: post.socDesc,
        socImage: post.socImage,
        socTitle: post.socTitle,
        created: post.created,
        edited: post.edited,
        authot: post.authot,
        articleContent: post.articleContent
      })
    })
  }).catch((er) => {
    res.status(418).send(er)
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
  console.log(`Server podignut na portu ${port}`)
})