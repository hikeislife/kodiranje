const express = require('express')
                require('../db/mongoose')
const Course  = require('../db/models/course')
const Article = require('../db/models/article')
const hbs     = require('hbs')
const auth    = require('../middleware/auth')

hbs.registerHelper("increment", function (value, options) {
  return parseInt(value) + 1;
});

const courseRouter = new express.Router()

courseRouter.get('/admin/svi-kursevi', auth, async (req, res) => {
  const kursevi = await Course.find().select('-__v').sort({ order: 1 })
  
  res.render('courses/showAllCourses', { googTitle: "Svi kursevi", robots: true, kursevi: kursevi })
})

courseRouter.get('/admin/detalji-kursa/:id', auth, async (req, res) => {
  const _id = req.params.id
  const course = await Course.findById(_id)
  const inactive = await Article.find({ courseName: course.setId, published: false }).select('navName selectedURL courseName')
  const active = await Article.find({ courseName: course.setId, published: true }).select('navName selectedURL courseName')
  const activeCourses = active.length
  const inactiveCourses = inactive.length
  const total = activeCourses + inactiveCourses
  res.render('courses/courseDetails', { googTitle: "Detalji kursa", robots: true, course, total, active, activeCourses, inactive, inactiveCourses })
})

courseRouter.get('/admin/dodaj-kurs', auth, async (req, res) => {
  const order = await findOrder()
  res.render('courses/addNewCourse', { googTitle: "Dodaj kurs", robots: true, order })
})

courseRouter.post('/admin/addNewCourse', auth, async (req, res) => {
  if (req.body.active) {
    req.body.active = true;
  }
  //console.log(req.body)
  req.body.setId = req.body.name.toLowerCase().replace(/ /gi, '-')
  const courseName = new Course(req.body)
  try {
    await courseName.save().then(() => {
      res.redirect('/admin/svi-kursevi')
    })
  } catch (er) {
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

courseRouter.get('/admin/izmeni-kurs/:id', auth, async (req, res) => {
  const _id = req.params.id
  try {
    const course = await Course.findById(_id)
    
    if (!course) return res.status(404).send()

    res.render('courses/editCourse', { course, robots: true, googTitle: "Izmeni kurs"})
  } catch (e) {
    console.log(e)
    res.status(500).send()
  }
})

courseRouter.patch('/admin/edit-course/:id', auth, async (req, res) => {
  const _id = req.params.id
  try {
    let course = await Course.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true
    })
    
    if (!course) return res.status(404).send()

    course = await Course.findById(_id)
    res.render('courses/editCourse', { course })
  } catch (e) {
    console.log(e)
    res.status(500).send()
  }
})

courseRouter.get('/admin/reorganizuj-kurseve', auth, async (req, res) => {
  const kursevi = await Course.find().select('-__v').sort({ order: 1 })

  res.render('courses/reorderCourses', { googTitle: "Reorganizuj kurseve", robots: true, kursevi: kursevi })
})

courseRouter.patch('/admin/batchEditCourses', auth, async (req, res) => {
  const courses = req.body
  courses.forEach(course => {
    updateEach(course)
  })
  res.method = "GET"
  res.redirect(303, '/admin/dodaj-lekciju')
})

// Delete
courseRouter.get('/admin/ukloni-kurs/:id', auth, async (req, res) => {
  const _id = req.params.id
  const course = await Course.findById(_id)
  res.render('courses/deleteCourse', { googTitle: "Obriši kurs", robots: true, course })
})

courseRouter.delete('/admin/delete-course/:id', auth, async (req, res) => {
  const _id = req.params.id
  try {
    const course = await Course.findByIdAndDelete(_id)
    if (!course) {
      return res.status(404).send()
    }
    res.redirect('back')
  } catch (e) {
    res.status(500).send()
  }
})

const findOrder = async () => {
  const order = await Course.findOne().select('order -_id').sort({ order: -1 })
  return order
}

updateEach = async (course) => {
  try {
    let kurs = await Course.findByIdAndUpdate(course._id, course, {
      new: true,
      runValidators: true
    })
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  courseRouter
}