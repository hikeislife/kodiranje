const express = require('express')
//const session = require('express-session')
require('../db/mongoose')
const Course = require('../db/models/course')
const hbs = require('hbs');

hbs.registerHelper("increment", function (value, options) {
  return parseInt(value) + 1;
});

const courseRouter = new express.Router()

courseRouter.get('/admin/svi-kursevi', async (req, res) => {
  const kursevi = await Course.find().select('-__v').sort({ order: 1 })
  
  res.render('courses/showAllCourses', { googTitle: "Svi kursevi", robots: true, kursevi: kursevi })
})

courseRouter.get('/admin/detalji-kursa/:id', async (req, res) => {
  const _id = req.params.id
  const course = await Course.findById(_id)
  res.render('courses/courseDetails', { googTitle: "Detalji kursa", robots: true, course })
})

courseRouter.get('/admin/dodaj-kurs', async (req, res) => {
  const order = await findOrder()
  console.log(order)
  res.render('courses/addNewCourse', { googTitle: "Dodaj kurs", robots: true, order})
})

courseRouter.post('/admin/addNewCourse', async (req, res) => {
  if (req.body.active) {
    req.body.active = true;
  }
  req.body.setId = req.body.name.toLowerCase().replace(/ /gi, '-')
  const courseName = new Course(req.body)
  try {
    await courseName.save().then(() => {
    res.redirect('/admin/svi-kursevi')
  })
  } catch(er) {
    const order = await findOrder()
    console.log(er)
    let errorMessage = er.errmsg || 
                       er.errors.name.message || 
                       er.errors.active.message || 
                       er.errors.order.message
    if (errorMessage.includes('E11000')) errorMessage = "Duplirani unos"
    res.render('courses/addNewCourse', { googTitle: "Dodaj kurs", robots: true, errorMessage, order })
  } 
})

// Delete
courseRouter.get('/admin/ukloni-kurs/:id', async (req, res) => {
  const _id = req.params.id
  const course = await Course.findById(_id)
  res.render('courses/deleteCourse', { googTitle: "Obriši kurs", robots: true, course })
})

findOrder = async() => {
  const order = await Course.findOne().select('order -_id').sort({ order: -1 })
  return order
}




module.exports = {
  courseRouter
}