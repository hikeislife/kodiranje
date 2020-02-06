const express     = require('express')
const session     = require('express-session')
                    require('../db/mongoose')
const Admin = require('../db/models/admin')
const bcrypt = require('bcryptjs')

const adminRouter = new express.Router()

// GET/login
adminRouter.get('/admin', (req, res) => { 
  res.render('admin/login', { googTitle: "Log in", robots: true})
})

// POST/login
adminRouter.post('/admin/login', async (req, res) => {
  try {
    const user = await Admin.findByCredentials(req.body.username, req.body.password)
    //const uid = user._id
    res.redirect('/admin/svi-admini')
  } catch (er) {
    res.status(403).render('admin/login', { errorMessage: "log-in podaci nisu ispravni", googTitle: "Log in", robots: true })
  }
})

adminRouter.get('/admin/svi-admini', async (req, res) => {
  const admins = await Admin.find().select('-password -__v -tokens')
  res.render('admin/showAll', { admins, googTitle: "Svi admina", robots: true })
})

adminRouter.get('/admin/detalji/:id', async (req, res) => {
  const _id = req.params.id
  const user = await Admin.findById(_id)
  res.render('admin/adminDetails', { user: user, googTitle: "Dodaj admina", robots: true })
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
    res.status(201).render('admin/adminDetails', { message: "Novi admin dodat", user: admin })
  } catch (er) {
    res.status(418).render('admin/addNewAdmin', { errorMessage: er.errmsg, googTitle: "Dodaj admina", robots: true})
  }
})


// EDIT
adminRouter.get('/admin/izmeni-admina/:id', async (req, res) => {
  const _id = req.params.id
  try {
    const user = await Admin.findById(_id)

    if(!user) return res.status(404).send()

    res.render('admin/editAdmin', { user, googTitle: "Izmeni admina", robots: true })
  } catch (e) {
    res.status(500).send()
  }
})

adminRouter.patch('/admin/edit-admin/:id', async (req, res) => { 
  const _id = req.params.id
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
      res.render('admin/editAdmin', { user, googTitle: "Izmeni admina", robots: true })
    } catch (e) {
      console.log(e)
      res.status(500).send()
    }
  }
  else {
    const user = await Admin.findById(_id)
    res.render('admin/editAdmin', { user, googTitle: "Izmeni admina", robots: true })
  }
  
})

// DELETE
adminRouter.get('/admin/ukloni-admina/:id', async (req, res) => {
  const _id = req.params.id
  const admin = await Admin.findById(_id)
  res.render('admin/deleteAdmin', { googTitle: "Obriši admina", robots: true, admin: admin })
})

adminRouter.delete('/admin/delete-admin/:id', async (req, res) => {
  const _id = req.params.id
  try {
    const user = await Admin.findByIdAndDelete(_id)
    if(!user) {
      return res.status(404).send()
    }
    res.redirect('back')
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = {
  adminRouter
}