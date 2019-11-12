const express = require('express')
require('../db/mongoose')
const auth = require('../middleware/auth')

const adminRouter = new express.Router()

const redirectToLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect('/admin')
  } else {
    next()
  }
}

const redirectLogedIn = (req, res, next) => {
  if (req.session.userId) {
    res.redirect('/admin/novi-post') 
  } else {
    next()
  }
}

/* ADMIN */
adminRouter.get('/admin', redirectLogedIn, (req, res) => {
  console.log("token: ", req.session)
  //req.session.userId = req.userId
  res.render('admin/login')
})

adminRouter.get('/admin/me', redirectToLogin, (req, res) => {
  res.json(req.user)
})


adminRouter.get('/admin/novi-post', (req, res) => {
  // console.log('novi post', req.headers)
  // console.log('novi post headers: ', req.headers)
  // req.headers.set("Authorization", req.body);
  // console.log(`basic ${JSON.stringify(req.body.token)}`)
  // res.header('x-authorization', `bearer ${JSON.stringify(req.body.token)}`)
  console.log('novi post headers2: ', req.body)
  res.header('x-auth-token', req.token).render('admin/unos', { googTitle: "dodaj kurs", robots: true })
})

adminRouter.get('/admin/izmeni-post/:id', redirectToLogin, (req, res) => { })

adminRouter.get('/admin/dodaj-kurs', redirectToLogin, (req, res) => {
  res.render('admin/addNewCourse', redirectToLogin, { googTitle: "Dodaj kurs", robots: true })
})

adminRouter.get('/admin/dodaj-admina', redirectToLogin, (req, res) => {
  res.render('admin/addNewAdmin', { googTitle: "Dodaj admina", robots: true })
})

module.exports = {
  adminRouter, redirectToLogin
}