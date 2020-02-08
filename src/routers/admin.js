const express     = require('express')
//const session     = require('express-session')
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

adminRouter.get('/admin/svi-admini', async (req, res) => {
  const admins = await Admin.find().select('-password -__v -tokens')
  res.render('admin/showAll', { admins, googTitle: "Svi admina", robots: true })
})

adminRouter.get('/admin/detalji/:id', async (req, res) => {
  const _id = req.params.id
  const user = await Admin.findById(_id).select('-password')
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
  const newAdmin = new Admin(req.body)
  //console.log(admin.password)
  try {
    await newAdmin.save()
    const admin = await Admin.findById(newAdmin._id).select('-password')
    //const token = await admin.generateAuthToken()
    res.status(201).render('admin/adminDetails', { message: "Novi admin dodat", user: admin, robots: true, googTitle: "Novi admin" })
  } catch (er) {
    res.status(418).render('admin/addNewAdmin', { errorMessage: er.errmsg, googTitle: "Dodaj admina", robots: true})
  }
})


// EDIT
adminRouter.get('/admin/izmeni-admina/:id', async (req, res) => {
  const _id = req.params.id
  try {
    const user = await Admin.findById(_id).select('-password')

    if(!user) return res.status(404).send()

    res.render('admin/editAdmin', { user, googTitle: "Izmeni admina", robots: true })
  } catch (e) {
    res.status(500).send()
  }
})

adminRouter.patch('/admin/edit-admin/:id', async (req, res) => { 
  const _id = req.params.id
  if(req.body.newPassword === req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 8)
    const admin = req.body
    try {
      let user = await Admin.findByIdAndUpdate(_id, { admin }, {
        new: true,
        runValidators: true
      })
      
      if (!user) return res.status(404).send()
      
      user = await Admin.findById(_id).select('-password')
      res.render('admin/editAdmin', { user, googTitle: "Izmeni admina", robots: true })
    } catch (e) {
      console.log(e)
      res.status(500).send()
    }
  }
  else {
    const user = await Admin.findById(_id).select('-password')
    res.render('admin/editAdmin', { user, googTitle: "Izmeni admina", robots: true })
  }
  
})

// DELETE
adminRouter.get('/admin/ukloni-admina/:id', async (req, res) => {
  const _id = req.params.id
  const admin = await Admin.findById(_id).select('-password')
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