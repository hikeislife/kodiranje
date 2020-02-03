const express     = require('express')
const session     = require('express-session')
                    require('../db/mongoose')
const Admin = require('../db/models/admin')
const bcrypt = require('bcryptjs')

const adminRouter = new express.Router()

// TODO: 5dd671fce33cda1b48a36b3c

const goneId = '5e33f813adf08113341d070c'

// GET/login
adminRouter.get('/admin', (req, res) => { 
  res.render('admin/login')
})

// POST/login
adminRouter.post('/admin/login', async (req, res) => {
  try {
    const user = await Admin.findByCredentials(req.body.username, req.body.password)
    //const uid = user._id
    res.redirect('/admin/dodaj-admina')
  } catch (er) {
    res.status(403).render('admin/login',  { errorMessage: "log-in podaci nisu ispravni" })
  }
})

adminRouter.get('/admin/me', async (req, res) => {
  const _id = goneId
  const user = await Admin.findById(_id)
  res.render('admin/adminDetails', { user })
})

// LOGOUT

// REGISTRACIJA
// GET/dodaj-admina  ~  register
adminRouter.get('/admin/dodaj-admina', (req, res) => {
 res.render('admin/addNewAdmin', { googTitle: "Dodaj admina", robots: true })
})

// POST/addNewAdmin  ~  register
adminRouter.post('/admin/addNewAdmin/', async (req, res, body) => {
  const admin = new Admin(req.body)
  try {
    await admin.save()
    //const token = await admin.generateAuthToken()
    res.status(201).render('admin/adminDetails', { message: "Novi admin dodat", test: admin._id})
  } catch (er) {
    res.status(418).render('admin/addNewAdmin', { errorMessage: er.errmsg})
  }
})


// EDIT
adminRouter.get('/admin/izmeni-admina/:id', async (req, res) => {
  const _id = goneId //req.params.id
  try {
    const user = await Admin.findById(_id)

    if(!user) return res.status(404).send()

    res.render('admin/editAdmin', { user })
  } catch (e) {
    res.status(500).send()
  }
})

adminRouter.post('/admin/edit-admin/:id', async (req, res) => { 
  const _id = goneId //req.params.id
  if(req.body.newPassword === req.body.password) {
    try {
      let user = await Admin.findByIdAndUpdate(_id, {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 8)
      }, {
        new: true,
        runValidators: true
      })
      
      if (!user) return res.status(404).send()
      
      user = await Admin.findById(_id)
      res.render('admin/editAdmin', { user })
    } catch (e) {
      console.log(e)
      res.status(500).send()
    }
  }
  else {
    const user = await Admin.findById(_id)
    res.render('admin/editAdmin', { user })
  }
  
})

// DELETE
adminRouter.get('/admin/ukloni-admina/:id', (req, res) => {
  const id = req.params.id
  res.render('admin/deleteAdmin', { googTitle: "Obriši admina", robots: true, adminId: id })
})

// FIXME: post
adminRouter.delete('/admin/delete-admin/:id', async (req, res) => {
  const _id = req.params.id
  try {
    const user = await Admin.findByIdAndDelete(_id)
    if(!user) {
      console.log('not found')
      return res.status(404).send()
    }
    res.redirect('/')
  } catch (e) {
    console.log(e)
    res.status(500).send()
  }
})

module.exports = {
  adminRouter
}