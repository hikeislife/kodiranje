const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')
// const session = require('express-session');
// const nm = require('nodemailer')
const jwt = require('jsonwebtoken')
const soft = require('./middleware/soft')
// const fs = require('fs')

// const MongoStore = require('connect-mongo')(session)
// const mongoose = require('mongoose')

const Article = require('./db/models/article')
const { adminRouter } = require('./routers/admin.js')
const { courseRouter } = require('./routers/courses.js')
const { articleRouter } = require('./routers/articles.js')
// // if (!process.env.JWT_P_KEY) { // Breaks app down if no jwt secret is provided 
// //   console.log('FATAL ERROR JWT_P_KEY not defined')
// //   process.exit(1)
// // } 
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

// // app.use((req, res, next) => {
// //   res.status(503).send('Sajt trenutno nije dostupan usled updejta, molimo proverite ponovo za par minuta')
// //   // res.render('503')
// // })

app.use(adminRouter)
app.use(courseRouter)
app.use(articleRouter)

// //const lER = process.env.CERTBOT_RESPONSE;
const port = process.env.PORT
const dir = path.join(__dirname)
// const og = path.join(__dirname, 'imgs/og')
const views = path.join(__dirname, 'views')

app.set('view engine', 'hbs')
app.set('views', views)
app.set('view options', { layout: 'index' })
hbs.registerPartials(views)
hbs.registerHelper('formatDate', (datetime) => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
  date = datetime.toLocaleDateString('sr', options).split('/')

  return date
})
hbs.registerHelper({
  eq: function (v1, v2) {
    return v1 === v2;
  },
  //   ne: function (v1, v2) {
  //     return v1 !== v2;
  //   },
  //   lt: function (v1, v2) {
  //     return v1 < v2;
  //   },
  gt: function (v1, v2) {
    return v1 > v2;
  },
  //   lte: function (v1, v2) {
  //     return v1 <= v2;
  //   },
  //   gte: function (v1, v2) {
  //     return v1 >= v2;
  //   },
  //   and: function () {
  //     return Array.prototype.slice.call(arguments).every(Boolean);
  //   },
  //   or: function () {
  //     return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
  //   }
});

app.use(express.static(dir))
// app.use(express.static(og))
// app.use(express.static('./js/front'))

// app.use((er, req, res, text) => {
//   console.error(er.stack)
//   res.status(500)
//   res.render('500')
// })

// app.get('/.well-known/brave-rewards-verification.txt', function (req, res) {
//   res.send(`This is a Brave Rewards publisher verification file.

// Domain: kodiranje.in.rs
// Token: abcb4fb39be4701ed30b31c8cc3fbf025c65ba34b8a296321bfbbea027806a30
// `);
// });

/* PATHS */
/* front page */
app.get('/', soft, async (req, res) => {
  try {
    if (req.header('Cookie')) {
      // console.log(req.header('Cookie'))
      const cookies = req.header('Cookie').split(';')
      let token
      cookies.forEach(x => {
        const halves = x.split('=')
        if (halves[0].trim() === 'token')
          token = halves[1]
      })
      // console.log('TOKEN:' + token)
      // try {
      // userId = await jwt.verify(token, process.env.JWT_P_KEY)._id
      // } catch (error) {
      // console.log('token expired')
      // }
    }
  } catch (er) {
    console.log(er)
  }


  try {
    Article.find({ courseName: 'mp', published: true }).sort({ order: 1 }).select('_id navName selectedURL ').then(menu => {
      if (!menu) {
        return res.status(404).send()
      } else {
        //console.log(menu) 
      }

      res.render('home/home', {
        mainMenu: menu,
        title: "Kodiranje",
      })
    })
  } catch (er) {
    console.log(er)
  }
})

app.get('/kontakt', (req, res) => {
  res.render('contact')
})

app.get('/donirajte', (req, res) => {
  const googTitle = "Donacije"
  res.render('donations/donations', { googTitle })
})



// app.post('/send', (req, res) => {
//   const output = `
//     <p>Message from <b>${req.body.senderName}</b> via "Kodiranje" website</p>
//     <dic>${req.body.message}</div>
//   `
//   let transporter = nm.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     secure: false,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS
//     }//, // this part is just for testing on localhost
//     // tls: {
//     //   rejectUnauthorized: false
//     // }
//   })
//   let mailOptions = {
//     from: `${req.body.sender}`,
//     to: `ellablun@gmail.com`,
//     subject: `Poruka sa kodiranja`,
//     html: output
//   }
//   transporter.sendMail(mailOptions, (er, info) => {
//     if (er) {
//       return console.log(er)
//     }
//     // console.log('message sent: %s', info.messageId)
//     // console.log('preview: %s', nm.getTestMessageUrl(info))

//     res.render('contact', { msg: 'Poruka poslata' })
//   })
// })

// app.get('/recnik', (req, res) => {
//   res.send('rečnik')
// })

app.get('/:kurs', (req, res) => {
  const resp = req.params.kurs
  res.send('tutorijal ' + resp)
})

app.get('/:kurs/:lekcija', (req, res) => {
  Article
    .findOne({
      courseName: req.params.kurs,
      selectedURL: req.params.lekcija
    })
    .select('-__v -published -_id')
    .then((post) => {
      if (post?.socImage) {
        //         let buffer = Buffer.from(post.socImage.buffer)
        //         // Saves ogImage from db localy so that url can be provided 
        //         const fileName = `src/imgs/og/og-${req.params.kurs}-${req.params.lekcija}.webp`
        //         fs.writeFile(fileName, buffer, (er) => {
        //           if (er) console.log(er)
        //         })
      }
      //})
      Article
        .find({
          courseName: req.params.kurs,
          published: true
        })
        .sort({ order: 1 })
        .select('_id navName selectedURL')
        .then(menu => {
          if (!menu) {
            return res.status(404).send()
          }
          res.render('article', { menu, post })
        })
    }).catch((er) => {
      res.status(418).send(er)
    })
  // res.send('hello ')
})



// // app.get('/recnik/*', (req, res) => {
// //   res.send('Članak nije pronađen')
// // })

// app.get('*', (req, res) => {
//   res.render('404', {
//     title: "Kodiranje"
//   })
// })

app.listen(port, () => {
  console.log(`Server podignut na portu http://localhost:${port}`)
})