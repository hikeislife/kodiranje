const express    = require('express')
const path       = require('path')
const hbs        = require('hbs')
const bodyParser = require('body-parser')

require('./db/mongoose')
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

app.use(express.static(dir))
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
app.use((er, rew, res, text) => {
  console.error(er.stack)
  res.status(500)
  res.render('500')
})

/* PATHS */
/* front page */
app.get('', (req, res) => {
  res.render('home', {
    title: "Kodiranje"
  })
})

/* ADMIN */

app.get('/admin', (req, res) => {
  res.render('admin/login', { title: "log in" })
})

app.get('/admin/novi-post', (req, res) => {
  res.render('admin/unos', { title: "dodaj kurs" })
})

app.get('/admin/izmeni-post/:id', (req, res) => { })

app.get('/admin/editPost/:id', (req, res) => { })

app.get('/admin/dodaj-kurs', (req, res) => { 
  res.render('admin/addNewCourse', {googTitle : "Dodaj kurs"})
 })


/* API */

/* COURSES API */
app.get('/admin/getCourseById/:id', (req, res) => {
  Course.findById(req.params.id).then((tut) => {
    if(!tut) {
      return res.status(404).send()
    }
    res.send(tut)
  }).catch((er) => {
    res.status(500).send(er.message)
  })
})

app.get('/admin/getAllCourses/', (req, res) => {
  Course.find({}).sort({ order : 1 }).then(courses => {
    if(!courses) {
      return res.status(404).send()
    }
    res.json(courses)
  }).catch((er) => {
    res.status(500).send(er.message)
  })
})

app.get('/admin/getActiveCourses', (req, res) => {
  Course.find({ active: true }).sort({ order: 1 }).then((courses) => {
    if (!courses) {
      return res.status(404).send()
    }
    
    res.json(courses)
  }).catch((er) => {
    res.status(500).send(er.message)
  })
})

app.post('/admin/addNewCourse', (req, res) => {
  // TODO: remove following line when front does it's thing
  // req.body.setId = req.body.name
  const kurs = new Course(req.body)
  kurs.save().then(() => {
    res.status(201).send(req.body)
  }).catch((er) => {
    if (er.errors) {
      if (er.errors.name) return res.status(418).send(er.errors.name.message)
      if (er.errors.active) return res.status(418).send(er.errors.active.message)
      if (er.errors.order) return res.status(418).send(er.errors.order.message)
    }
    res.status(418).send(er.errmsg)
  })
})

/* ADMINS API */
app.get('/admin/getAdminById/:id', (req, res) => {
  Admin.findById(req.params.id).then((admin) => {
    if(!admin) {
      return res.status(404).send()
    }
    res.json(admin)
  }).catch((er) => {
    res.send(er.message)
  })
})

app.get('/admin/getAllAdmins', (req, res) => {
  Admin.find({}).then(admins => {
    res.json(admins)
  }).catch(er => {
    res.status(500).send()
  })
})

app.post('/admin/addNewAdmin', (req, res, body) => {
  const admin = new Admin(req.body)
  admin.save().then((adm) => {
    res.status(201).send(req.body)
  }).catch((er) => {
    if (er.errors.name) return res.status(418).send(er.errors.name.message)
    if (er.errors.username) return res.status(418).send(er.errors.username.message)
    if (er.errors.email) return res.status(418).send(er.errors.email.message)
    if (er.errors.password) return res.status(418).send(er.errors.password.message)
    res.status(418).send(er.errors)
  })
})

/* POSTS API */
app.post('/admin/addPost', (req, res) => {
  const post = new Article(req.body)
  post.save().then(() => {}).catch((er) => {
    res.status(er)
  })
})

app.post('/admin/addPost', (req, res) => { })

app.get('/:kurs/:lekcija', (req, res) => {})










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
