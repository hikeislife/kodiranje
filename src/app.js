const express = require('express')
const compression = require('compression')
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')
// const connectDB = require('./db/mongoose')()
// const session = require('express-session');
// const nm = require('nodemailer')
// const jwt = require('jsonwebtoken')
const soft = require('./middleware/soft')
const fs = require('fs')
const https = require('https')

// will automatically resize all of your pics, definitely not to be used like this
// const sharp = require('sharp');
// const directory = './src/imgs';
// fs.readdirSync(directory).forEach(file => {
//   sharp(`${directory}/${file}`)
//     .resize(200, 100) // width, height
//     .toFile(`${directory}/${file}-small.jpg`);
//   });

// const MongoStore = require('connect-mongo')(session)
// const mongoose = require('mongoose')
const Article = require('./db/models/article')
const { adminRouter } = require('./routers/admin.js')
const { courseRouter } = require('./routers/courses.js')
const { articleRouter } = require('./routers/articles.js')
const { dictRouter } = require('./routers/dictionaries.js')
// // if (!process.env.JWT_P_KEY) { // Breaks app down if no jwt secret is provided 
// //   process.exit(1)
// // } 
const app = new express()
app.use(compression())

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

// cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  next()
})


// const env = process.env.NODE_ENV || 'development'
// const forceSSL = function (req, res, next) {
//   if (req.headers['x-forwarded-proto'] !== 'https') {
//     return res.redirect(['https://', req.get('Host'), req.url].join(''))
//   }
//   next()
// }
// app.use(forceSSL)

// app.configure(function () {
//   if (process.env.NODE_ENV === 'production') {
//     app.use(forceSSL)
//   }
// })

// // app.use((req, res, next) => {
// //   res.status(503).send('Sajt trenutno nije dostupan usled updejta, molimo proverite ponovo za par minuta')
// //   // res.render('503')
// // })

app.use(adminRouter)
app.use(courseRouter)
app.use(articleRouter)
app.use(dictRouter)


process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
})

// //const lER = process.env.CERTBOT_RESPONSE;
const port = process.env.PORT

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAvV90ykKjOLS+YRw+vfOGcByPHrOYUG+2PljhbYkABIa8R+7N
I3swbpApeCgzYM9MRYHd5cUpWH0eJOINCTmE+0hJva8Zm27aJ0pjN9Y2lsMgO/fg
kkQtz98x8TWOAjVRKI1r5arL2dqGmO0nWP/r+s4IKA8DBOvcTrKwR34h2PImdcXZ
5YNSRtWWrZ4FYjKMrY6JcE58KNhN5FdWYCqtlmkuEL/jJZtfJapcx4T5LBoSiitg
RBTutyA1/Lfqy2s95jtVmRTns7aiaIYPVSaqtSunNvlE59oTrUzSkHyfYl0UbB/J
u4BeBuASkjNBXkjIRaQYrQ4KF2OILpOpkXcqdwIDAQABAoIBAESwx1BGc6YyCYx4
DlogZ3drJI7iXjFvFA/xdXOh6hu6M7lz6X0hRiQUrrYi/t/y0Zu0y6R4q9KpL7H5
PPlHn/D1+6mORh+XShJObUbnsM1m4d5ev1rO2D86mocAAg7TAClRgv2/wkm3dnMq
MseZrSNAcLz3FQVH+JWjQ0XrfqOOMiyHIgkv20M2hqzGqE2AsxvDeIS43WIcHHrx
J+ijmqT3S4Nzoq3X0v8NzOj4EuAqwG8+1BZjNMxl3Kam+sE0yf4Cv7ryFEa0/o5y
MqRStHm0ApLq/dCiYuzexj/hPv28JOCZdzqZlGXYBb/0nHgynEx5KBASi38Nb9fn
7jSxb6ECgYEA7XqHqWVgRKafV1MbH33+8xIv9kZuJtUQ6FP2C2r5AiSb+S6xQRWz
v3n2TMh49+Un4sppK5f4j2SgMSgFfw8HvH0EcYIf3Hfz/Byk+qzVA+Sd+PukKEot
S4hS+eMZhKhz8AIyE+QZ7DsTbktGdz3nwzyWbo2t9Ba+92ol00L0VVMCgYEAzCRz
1ZtiMphPTByNyNtGKL47riuKlvFgogJ4b9rALCYuuagLCOlTLNes3oPs5+cgs7ZK
NBlm5wP8tldOmU7lCxguQc33l/85nJE5KL8tgJoZrJs+4HFkCAizKxiQu+JTQMr0
C1iphkNqpgAVMK50AsMgI2k470KU++HwP4jL7c0CgYEAxZgIPPhu63BAcKZjkQaD
FbjyU1Yy3Pi3wrfpp4Jwgkn3xZQGRINMNmvCdgzwKkNvtpJ4g59FX/p4F66XNCtL
YpgbFF8TJ5xfVEx5MWKRM1YL41luM1/U5F4fvHArkWegX/lTtZ07vIVDG6hij2Dg
8F//Qyl7rfcnGjImGuxA5KUCgYAcxcKBx93GTctXaerd9XHlCjL1MHPfJHQ/QWPi
OA2/6z3IsxOjFOfBOUDHOAbrBJuKWNYKk836H4i91n5gg0srDiRu5+3OwY1IMPvC
b3elWZLmzhbFoZW8wCUonNTBdnvPdQuCkeOK5fOhI//Yla4KOaBM/Wal6ld/TPAE
tG4xvQKBgANecAC5e5Laq9XFoJD9JhMF0NdfokEJScedYB03uTwPUzodm/JVkc80
o1vaktLyxsv0MDAjkj9cLBo86Z3oy6T7WMq1MkvAzzgqOAloFHaC7UYdvSd9PMi7
L6kVy690mURAMe0T285+Q8lPVpLiZpOApCN7/rX2/LhmDLcPN73m
-----END RSA PRIVATE KEY-----`

const certificate = `-----BEGIN CERTIFICATE-----
MIIGgjCCBGqgAwIBAgIRAJwG6Wh4jJHyfZ1crHqfTFIwDQYJKoZIhvcNAQEMBQAw
SzELMAkGA1UEBhMCQVQxEDAOBgNVBAoTB1plcm9TU0wxKjAoBgNVBAMTIVplcm9T
U0wgUlNBIERvbWFpbiBTZWN1cmUgU2l0ZSBDQTAeFw0yMTEyMDgwMDAwMDBaFw0y
MjAzMDgyMzU5NTlaMBoxGDAWBgNVBAMTD2tvZGlyYW5qZS5pbi5yczCCASIwDQYJ
KoZIhvcNAQEBBQADggEPADCCAQoCggEBAL1fdMpCozi0vmEcPr3zhnAcjx6zmFBv
tj5Y4W2JAASGvEfuzSN7MG6QKXgoM2DPTEWB3eXFKVh9HiTiDQk5hPtISb2vGZtu
2idKYzfWNpbDIDv34JJELc/fMfE1jgI1USiNa+Wqy9nahpjtJ1j/6/rOCCgPAwTr
3E6ysEd+IdjyJnXF2eWDUkbVlq2eBWIyjK2OiXBOfCjYTeRXVmAqrZZpLhC/4yWb
XyWqXMeE+SwaEoorYEQU7rcgNfy36strPeY7VZkU57O2omiGD1UmqrUrpzb5ROfa
E61M0pB8n2JdFGwfybuAXgbgEpIzQV5IyEWkGK0OChdjiC6TqZF3KncCAwEAAaOC
ApAwggKMMB8GA1UdIwQYMBaAFMjZeGii2Rlo1T1y3l8KPty1hoamMB0GA1UdDgQW
BBRA06ONvxUCQbeOBjxDnATlGIgS8DAOBgNVHQ8BAf8EBAMCBaAwDAYDVR0TAQH/
BAIwADAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwSQYDVR0gBEIwQDA0
BgsrBgEEAbIxAQICTjAlMCMGCCsGAQUFBwIBFhdodHRwczovL3NlY3RpZ28uY29t
L0NQUzAIBgZngQwBAgEwgYgGCCsGAQUFBwEBBHwwejBLBggrBgEFBQcwAoY/aHR0
cDovL3plcm9zc2wuY3J0LnNlY3RpZ28uY29tL1plcm9TU0xSU0FEb21haW5TZWN1
cmVTaXRlQ0EuY3J0MCsGCCsGAQUFBzABhh9odHRwOi8vemVyb3NzbC5vY3NwLnNl
Y3RpZ28uY29tMIIBBAYKKwYBBAHWeQIEAgSB9QSB8gDwAHYARqVV63X6kSAwtaKJ
afTzfREsQXS+/Um4havy/HD+bUcAAAF9nGx+4gAABAMARzBFAiEAz8RYGCMX6er0
wYqva2rWVjnIchNle57/XGWf+kVeQ18CIGecn1BtaADep0uY0mnY1Wj497bnp6TC
XJ96eHwvCU/zAHYAQcjKsd8iRkoQxqE6CUKHXk4xixsD6+tLx2jwkGKWBvYAAAF9
nGx+pwAABAMARzBFAiEA2XkwXwRVAxgbm8LgTdPbDAoR1KDuDRcDe6IhZbrJqUAC
IH1vDPoULaiJRUFqb6kRJWDlY0qLIlSoH1uFPmIqppEyMC8GA1UdEQQoMCaCD2tv
ZGlyYW5qZS5pbi5yc4ITd3d3LmtvZGlyYW5qZS5pbi5yczANBgkqhkiG9w0BAQwF
AAOCAgEAa+LFr6i4frk2vMbJrKBRIuiPnwCu2Khed7l8qyn35b9HCSRNACQUaNbK
h797jsaI8oNKL5EOrh2gXN2Uu3FGj/ciu5DbKIHs1pRNYGpn3xG7/Tj0hFL6US3v
H/s2Z/1fO6OBX7FZGRiyUbVIy882nWSobU7oMaHFSw/yY7HX6yeCcMvsAABjxNrr
ofRG7M4+SywFAUXH7PoFC+qsxTIG3AqacofDDEgDv4a6TrKCqU0/JrAiB2q6HTiH
rzFGGX7HCXEjjbLqiDC1U9o1pAO3mCTTETaQWwag2yxt2UFRdtoLoQAj6CAaoyEh
gzEvDTJCWs0j1wCh3B/GGiKtIZV+CwWw7rOHWVM7EPc8Fpzcb6KQcEQ1JOMI7BX6
sTmpeE5yN+aK9ncg+02GQtYMHHZSgBURInxOjJD6IixGe3X3lFm4fcTnbEb+aDRU
ga9Uf1V8+aRZ4D3ZwRFPPDsmYRu4hvhlOY6vyJxUcOhpXGfGSrionNd/KMlBdRcx
Jdv/XzNirw8Epya8qdQSx4wbQUmLjdEgum0z5upEF3ojyx5XQCf3QcjYJctNq6T5
snU5fg0l1bXBOGJTQm6D+clsPhj02Cth66c+MUfWukIL/zuurifwM3V7MsOz1BIl
iRtN4+eDDKEu50/W4sTbSwRRX4AkED68A1l/+P1JzNtM4ceSo8Y=
-----END CERTIFICATE-----
`


const dir = path.join(__dirname)
// const og = path.join(__dirname, 'imgs/og')
let views
if (process.env.NODE_ENV === 'production') {
  views = path.join(__dirname, '..', 'views')
} else {
  views = path.join(__dirname, 'views')
}


const styles = path.join(__dirname, 'styles')

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
const imgs = path.join(__dirname, 'imgs'); // Static files in 'public' folder
app.use(express.static(imgs))
// app.use(express.static(og))
// app.use(express.static(highlighter))
app.use(express.static(path.join(__dirname, 'js')))

console.log("Contents of views folder:", fs.readdirSync(views))

// If you want to check other folders, you can use similar code for 'src' or any other directory
const srcPath = path.join(__dirname)
console.log("Contents of src folder:", fs.readdirSync(srcPath))

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
app.get('/', /*soft,*/ async (req, res) => {
  try {
    if (req.header('Cookie')) {
      const cookies = req.header('Cookie').split(';')
      let token
      cookies.forEach(x => {
        const halves = x.split('=')
        if (halves[0].trim() === 'token')
          token = halves[1]
      })
      // try {
      // userId = await jwt.verify(token, process.env.JWT_P_KEY)._id
      // } catch (error) {
      // }
    }
  } catch (er) {
    console.error(er)
  }


  try {
    Article.find({ courseName: 'mp', published: true }).sort({ order: 1 }).select('_id navName selectedURL ').then(menu => {
      if (!menu) {
        return res.status(404).send()
      } else {
      }

      res.render('home/home', {
        mainMenu: menu,
        title: "Kodiranje",
      })
    })
  } catch (er) {
    console.error(er)
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
//     }

//     res.render('contact', { msg: 'Poruka poslata' })
//   })
// })



// app.get('/:kurs', (req, res) => {
//   const courseName = req.params.kurs
//   try {
//     if (path.existsSync(filePath))
//     {
//         res.sendfile(filePath)
//     }
//     else
//     {
//       const data = Article.find({ courseName: courseName, published: true }).sort({ order: 1 })//.select('_id navName selectedURL ')
//       //  res.statusCode = 404;
//       //  res.write('404 sorry not found');
//       //  res.end();
//       res.send('tutorijal ' + data.courseName)
//     }
//   } catch (er) {
//     res.send(`/${courseName}`)
//   }
  
// })

app.get('/:kurs/:lekcija', (req, res) => {
  Article
    .findOne({
      courseName: req.params.kurs,
      selectedURL: req.params.lekcija
    })
    .select('-__v -published')
    .then((post) => {
      // if (post?.socImage) {
        //         let buffer = Buffer.from(post.socImage.buffer)
        //         // Saves ogImage from db localy so that url can be provided 
        //         const fileName = `src/imgs/og/og-${req.params.kurs}-${req.params.lekcija}.webp`
        //         fs.writeFile(fileName, buffer, (er) => {
        //           if (er) console.error(er)
        //         })
      // }
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

// app.listen(port, () => {
//   console.info(`Server podignut na portu http://localhost:${port}`)
// })


// https.createServer({
//     key: privateKey,
//     cert: certificate
// }, app).listen(port, () => {
//   console.info(`Server podignut na portu https://kodiranje.in.rs`)
// })


if (process.env.NODE_ENV === 'production') {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
} else {
  https.createServer({
    key: privateKey,
    cert: certificate
  }, app).listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`)
  })
}


// http://localhost:${port}