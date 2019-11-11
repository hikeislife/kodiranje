const express = require('express')
require('../db/mongoose')
const auth = require('../middleware/auth')

const adminRouter = new express.Router()


/* ADMIN */
adminRouter.get('/admin', (req, res) => {
  //console.log("token: ", req.token)
  res.render('admin/login', { googTitle: "log in", robots: true })
})

adminRouter.get('/admin/me', (req, res) => {
  res.json(req.user)
})


adminRouter.get('/admin/novi-post', (req, res) => {
  console.log('novi post', req.headers)
  //console.log('novi post headers: ', req.headers)
  //req.headers.set("Authorization", req.body);
  //console.log(`basic ${JSON.stringify(req.body.token)}`)
  //res.header('x-authorization', `bearer ${JSON.stringify(req.body.token)}`)
  //console.log('novi post headers2: ', req.headers)
  res.render('admin/unos', { googTitle: "dodaj kurs", robots: true })
})

adminRouter.get('/admin/izmeni-post/:id', (req, res) => { })

adminRouter.get('/admin/dodaj-kurs', (req, res) => {
  res.render('admin/addNewCourse', { googTitle: "Dodaj kurs", robots: true })
})

adminRouter.get('/admin/dodaj-admina', (req, res) => {
  res.render('admin/addNewAdmin', { googTitle: "Dodaj admina", robots: true })
})

module.exports = adminRouter