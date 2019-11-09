const express = require('express')
require('../db/mongoose')
const auth = require('../middleware/auth')


const adminRouter = new express.Router()

/* ADMIN */

adminRouter.get('/admin', (req, res) => {
  console.log("token: ", req.body.token)
  res.render('admin/login', { googTitle: "log in", robots: true })
})

adminRouter.get('/admin/me', auth, (req, res) => {
  res.json(req.user)
})


adminRouter.get('/admin/novi-post', (req, res) => {
  res.render('admin/unos', { googTitle: "dodaj kurs", robots: true })
})

adminRouter.get('/admin/izmeni-post/:id', auth, (req, res) => { })

adminRouter.get('/admin/dodaj-kurs', auth, (req, res) => {
  res.render('admin/addNewCourse', { googTitle: "Dodaj kurs", robots: true })
})

adminRouter.get('/admin/dodaj-admina', auth, (req, res) => {
  res.render('admin/addNewAdmin', { googTitle: "Dodaj admina", robots: true })
})

module.exports = adminRouter