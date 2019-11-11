const express = require('express')
require('../db/mongoose')
const Admin = require('../db/models/admin')
const Article = require('../db/models/article')
const Course = require('../db/models/course')
const auth = require('../middleware/auth')

const adminApiRouter = new express.Router()

/* API */

adminApiRouter.post('/api/login', async (req, res) => {
  try {
    const user = await Admin.findByCredentials(req.body.username, req.body.password)
    const token = await user.generateAuthToken()
    //console.log('api:', token)
    //res.redirect(200, '/admin/novi-post', { token: token, username: user.username })
    res.header('x-auth-token', token).status(200).send({ token: token, username: user.username, status: 200 })
    
  } catch (er) {
    res.status(403).send(er)
  }
})

adminApiRouter.post('/api/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token
    })
    await req.user.save()
    res.redirect('/')
  } catch (er) {
    res.status(500).send(er)
  }
})

/* COURSES API */
adminApiRouter.get('/api/getCourseById/:id', (req, res) => {
  Course.findById(req.params.id).then((tut) => {
    if (!tut) {
      return res.status(404).send()
    }
    res.send(tut)
  }).catch((er) => {
    res.status(500).send(er.message)
  })
})

adminApiRouter.get('/api/getAllCourses/', auth, (req, res) => {
  Course.find({}).sort({ order: 1 }).then(courses => {
    if (!courses) {
      return res.status(404).send()
    }
    res.json(courses)
  }).catch((er) => {
    res.status(500).send(er.message)
  })
})

adminApiRouter.get('/api/getActiveCourses', (req, res) => {
  Course.find({ active: true }).sort({ order: 1 }).then((courses) => {
    if (!courses) {
      return res.status(404).send()
    }
    res.json(courses)
  }).catch((er) => {
    res.status(500).send(er.message)
  })
})

adminApiRouter.post('/api/addNewCourse', auth, (req, res) => {
  const courseName = new Course(req.body)
  courseName.save().then(() => {
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
adminApiRouter.get('/api/getAdminById/:id', auth, (req, res) => {
  Admin.findById(req.params.id).then((admin) => {
    if (!admin) {
      return res.status(404).send()
    }
    res.json(admin)
  }).catch((er) => {
    res.send(er.message)
  })
})

adminApiRouter.get('/api/getAllAdmins', auth, (req, res) => {
  Admin.find({}).then(admins => {
    res.json(admins)
  }).catch(er => {
    res.status(500).send()
  })
})

adminApiRouter.post('/api/addNewAdmin/', auth, async (req, res, body) => {
  const admin = new Admin(req.body)
  try {
    await admin.save()
    const token = await admin.generateAuthToken()
    res.status(201).send('New admin created')
  } catch (er) {
    res.status(418).send(er)
  }
})

/* POSTS API */
adminApiRouter.get('/api/getPostById/:id', (req, res) => {
  Article.findById(req.params.id).then((post) => {
    if (!post) {
      return res.status(404).send()
    }
    res.json(post)
  }).catch((er) => {
    res.status(418).send(er.message)
  })
})

adminApiRouter.get('/api/getPost/:kurs/:lekcija', (req, res) => {
  Article.findOne({ courseName: req.params.kurs, selectedURL: req.params.lekcija }).then((post) => {
    if (!post) {
      return res.status(404).send()
    }
    res.json(post)
  }).catch((er) => {
    res.status(418).send(er)
  })
})

adminApiRouter.get('/api/getAllPostsInCourse/:kurs', (req, res) => {
  Article.find({ courseName: req.params.kurs }).select('-articleContent').sort({ order: 1 }).then((posts) => {
    if (!posts) {
      return res.status(404).send()
    }
    res.json(posts)
  }).catch((er) => {
    res.status(418).send(er)
  })
})

adminApiRouter.get('/api/getPubPostsInCourse/:kurs', (req, res) => {
  Article.find({ courseName: req.params.kurs, published: true }).select('_id navName order courseName selectedURL').sort({ order: 1 }).then((posts) => {
    if (!posts) {
      return res.status(404).send()
    }
    res.json(posts)
  }).catch((er) => {
    res.status(418).send(er)
  })
})

adminApiRouter.post('/api/addPost', auth, (req, res) => {
  const art = new Article(req.body)
  art.save().then(() => {
    res.status(201).send(req.body)
  }).catch((er) => {
    // if (er.errors) {
    //   if (er.errors.name) return res.status(418).send(er.errors.name.message)
    //   if (er.errors.active) return res.status(418).send(er.errors.active.message)
    //   if (er.errors.order) return res.status(418).send(er.errors.order.message)
    // }
    res.status(418).send(er)
  })
})

module.exports = adminApiRouter