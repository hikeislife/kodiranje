const express     = require('express')
const path        = require('path')
const hbs         = require('hbs')
const bodyParser  = require('body-parser')
const session     = require('express-session');
const nm          = require('nodemailer')
const jwt         = require('jsonwebtoken')
const fs          = require('fs')

const MongoStore  = require('connect-mongo')(session)
const mongoose    = require('mongoose')

const   Article         = require('./db/models/article')
const { adminRouter }   = require('./routers/admin.js')
const { courseRouter }  = require('./routers/courses.js')
const { articleRouter } = require('./routers/articles.js')

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

// app.use((req, res, next) => {
//   res.status(503).send('Sajt trenutno nije dostupan usled updejta, molimo proverite ponovo za par minuta')
//   // res.render('503')
// })

app.use(adminRouter)
app.use(courseRouter)
app.use(articleRouter)

//const lER = process.env.CERTBOT_RESPONSE;
const port       = process.env.PORT
const dir        = path.join(__dirname)
const og         = path.join(__dirname, 'imgs/og')
const views      = path.join(__dirname, 'views')

app.set('view engine', 'hbs')
app.set('views',        views)
app.set('view options', { layout: 'index' })
hbs.registerPartials(views)
hbs.registerHelper('formatDate', (datetime) => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
  dateAr = datetime.toLocaleDateString('sr', options).split('/')
  date = `${dateAr[1]}.${dateAr[0]}.${dateAr[2]}.`
  return date
})
hbs.registerHelper({
    eq: function (v1, v2) {
        return v1 === v2;
    },
    ne: function (v1, v2) {
        return v1 !== v2;
    },
    lt: function (v1, v2) {
        return v1 < v2;
    },
    gt: function (v1, v2) {
        return v1 > v2;
    },
    lte: function (v1, v2) {
        return v1 <= v2;
    },
    gte: function (v1, v2) {
        return v1 >= v2;
    },
    and: function () {
        return Array.prototype.slice.call(arguments).every(Boolean);
    },
    or: function () {
        return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
    }
});

app.use(express.static(dir))
app.use(express.static(og))
app.use(express.static('./js/front'))

app.use((er, req, res, text) => {
  console.error(er.stack)
  res.status(500)
  res.render('500')
})

// app.get('/.well-known/acme-challenge/:content', function (req, res) {
//   res.send(lER);
// });

/* PATHS */
/* front page */
app.get('/', async (req, res) => {
  let userId
  try {
    if (req.header('Cookie')) {
      const token = req.header('Cookie').split('=')[1]
    userId = await jwt.verify(token, process.env.JWT_P_KEY)._id
    }
  } catch (er) {
    console.log(er)
    userId = undefined
  }
  
  
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

app.get('/recnik', (req, res) => {
  res.send('rečnik')
})

// app.get('/:kurs', (req, res) => {
//   const resp = req.params.kurs
//   res.send('tut ' + resp)
// })

app.get('/:kurs/:lekcija', (req, res) => {
  Article
  .findOne({ 
    courseName: req.params.kurs, 
    selectedURL: req.params.lekcija })
  .select('-__v -published -_id')
  .then((post) => {
    let buffer = Buffer.from(post.socImage.buffer);
    // Saves ogImage from db localy so that url can be provided 
    const fileName = `src/imgs/og/og-${req.params.kurs}-${req.params.lekcija}.webp`
    fs.writeFile(fileName, buffer, (er) => {
      if (er) console.log(er)
    })
    Article
    .find({ 
      courseName: req.params.kurs, 
      published: true })
    .sort({ order: 1 })
    .select('_id navName selectedURL')
    .then(menu => {
      if(!menu) {
        return res.status(404).send()
      }
      
      res.render('article', { menu, post })
    })
  }).catch((er) => {
    res.status(418).send(er)
  })
})



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