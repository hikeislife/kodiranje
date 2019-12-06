//const config     = require('config')
const express    = require('express')
const path       = require('path')
const hbs        = require('hbs')
const bodyParser = require('body-parser')
const session    = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose   = require('mongoose');

const adminApiRouter   = require('./routers/adminApi.js')
const {adminRouter}    = require('./routers/admin.js')
const Article          = require('./db/models/article')

// if(!config.get('jwtPKey')) { // Breaks app down if no jwt secret is provided
//   console.log('FATAL ERROR jwtPKey not defined')
//   process.exit(1)
// } 

const app        = new express()
const port       = process.env.PORT || 80
const dir        = path.join(__dirname)
const views      = path.join(__dirname, 'views')

app.set('view engine', 'hbs')
app.set('views',        views)
app.set('view options', { layout: 'index' })
hbs.registerPartials(views)
const {
  SESS_LIFETIME = 1000 * 60 *60 *48,
  NODE_ENV = 'development',
} = process.env

//config.get('jwtPKey')
const IN_PROD = NODE_ENV === 'production'
app.use(session({
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  secret: 'kodiranje_dev',
  name: 'sid',
  cookie: {
    path: '/admin',
    expires: SESS_LIFETIME,
    maxAge: SESS_LIFETIME,
    sameSite: true,
    secure: IN_PROD
  }
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


/* PATHS */
/* front page */
app.get('/', (req, res) => {
  if(req.session) {const { userId } = req.session}
  else userId = null;
  
  Article.find({ courseName: 'mp', published: true }).sort({ order: 1 }).select('_id navName selectedURL ').then(menu => {
    if (!menu) {
      return res.status(404).send()
    }
    res.render('home', {
       mainMenu: menu,
       userId: userId,
      title: "Kodiranje", 
    })
  })
})

// const multer = require('multer')
// const socImage = multer({
//   dest: './src/imgs/og/',
//    limits: {
  //    fileSize: 1000000
//},
//  fileFilter(req, file, cb) {
  //  if(!file.originalname.endsWith('.jpg')) { return cb(new Error('file must be an image')) }
  // if(!file.originalname.match(/\.(jpg|png|jpeg|gif)$/)) {}
  //  cb(new Error('file must be an image'))
  //  cb(undefined, true)
//}
// })
// app.post('/api/upload', socImage.single('socImage'), (req, res, next) => {
//   res.send('img uploaded')
// })




app.get('/tut/:kurs/:lekcija', (req, res) => {
  Article.findOne({ courseName: req.params.kurs, selectedURL: req.params.lekcija }).select('-__v -published -_id').then((post) => {
    Article.find({ courseName: req.params.kurs, published: true }).sort({ order: 1 }).select('_id navName selectedURL').then(menu => {
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
  console.log(`Server podignut na portu http://localhost:${port}`)
})