const express        = require('express')
const path           = require('path')
const hbs            = require('hbs')
const bodyParser     = require('body-parser')
const session        = require('express-session');
const nm             = require('nodemailer')
const MongoStore     = require('connect-mongo')(session)
const mongoose       = require('mongoose')

//const adminApiRouter = require('./routers/adminApi.js')

const Article         = require('./db/models/article')
const { adminRouter } = require('./routers/admin.js')
const { courseRouter } = require('./routers/courses.js')

// if (!process.env.JWT_P_KEY) { // Breaks app down if no jwt secret is provided 
//   console.log('FATAL ERROR JWT_P_KEY not defined')
//   process.exit(1)
// } 
const app = new express()
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

app.use(adminRouter)
app.use(courseRouter)

const port       = process.env.PORT
const dir        = path.join(__dirname)
const views      = path.join(__dirname, 'views')

app.set('view engine', 'hbs')
app.set('views',        views)
app.set('view options', { layout: 'index' })
hbs.registerPartials(views)



app.use(express.static(dir))
app.use(express.static('./js/front'))


app.use((er, req, res, text) => {
  console.error(er.stack)
  res.status(500)
  res.render('500')
})
//app.use(adminApiRouter)




/* PATHS */
/* front page */
app.get('/', (req, res) => {
  try {
    const { userId } = req.session
  } catch (er) {
    userId = undefined
  }
  // if(req.session) {const { userId } = req.session}
  // else userId = null;
  
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

app.get('/kontakt', (req, res) => {
  res.render('contact')
})

app.post('/send', (req, res) => {
  const output = `
    <p>Message from <b>${ req.body.senderName }</b> via "Kodiranje" website</p>
    <dic>${ req.body.message }</div>
  `
  let transporter = nm.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }//, // this part is just for testing on localhost
    // tls: {
    //   rejectUnauthorized: false
    // }
  })
  let mailOptions = {
    from: `${req.body.sender}`,
    to: `ellablun@gmail.com`,
    subject: `Poruka sa kodiranja`,
    html: output
  }
  transporter.sendMail(mailOptions, (er, info) => {
    if(er) {
      return console.log(er)
    }
    // console.log('message sent: %s', info.messageId)
    // console.log('preview: %s', nm.getTestMessageUrl(info))

    res.render('contact', { msg: 'Poruka poslata' })
  })
})

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