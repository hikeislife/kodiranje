const express   = require('express')
const session   = require('express-session')
                  require('../db/mongoose')
const Admin     = require('../db/models/admin')
const bcrypt    = require('bcryptjs')
const auth      = require('../middleware/auth')

const adminRouter = new express.Router()

// GET/login
adminRouter.get('/admin', (req, res) => { 
  res.render('admin/login', { googTitle: "Log in", robots: true})
})

// POST/login
adminRouter.post('/admin/login', async (req, res) => {
  try {
    const admin = await Admin.findByCredentials(req.body.username, req.body.password)
    let token = ''
    if (!admin) {
      return res.status(401).json({ errorMessage: "log in podaci nisu ispravni"})
    } 
    else {
      try {
        token = await admin.generateAuthToken()
      } 
      catch (e) { 
        console.log(e)
      }
      //res.setHeader('Content-Type', 'application/json')
      res.status(200).json({ token, robots: true, googTitle: "Sve lekcije" })
    }    
  } catch (er) {
    console.log(er)
    res.setHeader('Content-Type', 'application/json')
    res.status(403).json({
      errorMessage: "log-in podaci nisu ispravni", 
    })
  }
})

adminRouter.get('/admin/svi-admini', auth, async (req, res) => {
  const admins = await Admin.find().select('-password -__v -tokens')
  res.status(200)
  res.render('admin/showAll', { admins, googTitle: "Svi admina", robots: true })
})

adminRouter.get('/admin/detalji/:id', auth, async (req, res) => {
  const _id = req.params.id
  const user = await Admin.findById(_id).select('-password -__v -tokens')
  res.render('admin/adminDetails', { user: user, googTitle: "Dodaj admina", robots: true })
})

// LOGOUT

// REGISTRACIJA
// GET/dodaj-admina  ~  register
adminRouter.get('/admin/dodaj-admina', auth, (req, res) => {
 res.render('admin/addNewAdmin', { googTitle: "Dodaj admina", robots: true })
})

// POST/addNewAdmin  ~  register
adminRouter.post('/admin/addNewAdmin/', /*auth,*/ async (req, res, body) => {
  const newAdmin = new Admin(req.body)
  try {
    await newAdmin.save()
    const admin = await Admin.findById(newAdmin._id).select('-password -__v -tokens')
    //const token = await admin.generateAuthToken()
    res.status(201).render('admin/adminDetails', { message: "Novi admin dodat", user: admin, robots: true, googTitle: "Novi admin" })
  } catch (er) {
    res.status(418).render('admin/addNewAdmin', { errorMessage: er.errmsg, googTitle: "Dodaj admina", robots: true})
  }
})


// EDIT
adminRouter.get('/admin/izmeni-admina/:id', auth, async (req, res) => {
  const _id = req.params.id
  try {
    const user = await Admin.findById(_id).select('-password -__v -tokens')

    if(!user) return res.status(404).send()

    res.render('admin/editAdmin', { user, googTitle: "Izmeni admina", robots: true })
  } catch (e) {
    res.status(500).send()
  }
})

adminRouter.patch('/admin/edit-admin/:id', auth, async (req, res) => { 
  const _id = req.params.id
  if(req.body.newPassword === req.body.password) {
    //req.body.password = 
    const admin = {name: req.body.name,
                   username: req.body.username,
                   password: await bcrypt.hash(req.body.password, 8),
                   email: req.body.email}
    try {
      let user = await Admin.findByIdAndUpdate({ _id }, { $set: admin }, {
        new: true,
        runValidators: true
      })
      console.log(user)
      if (!user) return res.status(404).send()
      res.redirect(`/admin/detalji/${_id}`)
    } catch (e) {
      console.log(e)
      res.status(500).send()
    }
  }
  else {
    const user = await Admin.findById(_id).select('-password -__v -tokens')
    res.status(418).render('admin/editAdmin', { user, googTitle: "Izmeni admina", robots: true })
  }
  
})

// DELETE
adminRouter.get('/admin/ukloni-admina/:id', auth, async (req, res) => {
  const _id = req.params.id
  const admin = await Admin.findById(_id).select('-password -__v -tokens')
  res.render('admin/deleteAdmin', { googTitle: "Obriši admina", robots: true, admin })
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