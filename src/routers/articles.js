const express = require('express')
const multer = require('multer')
require('../db/mongoose')
const Article = require('../db/models/article')
const Course = require('../db/models/course')
const auth = require('../middleware/auth')
const updateEach = require('../middleware/batchUpdate')
const generateSiteMap = require('../middleware/generateSiteMap')

const articleRouter = new express.Router()



// #ADDNEW:#GET:
articleRouter.get('/admin/dodaj-lekciju', auth, async (req, res) => {
  const courseList = await Course.find({ active: true }).select('-order -__v -_id -active').sort({ order: 1 })
  const admin = req.data.user

  res.render('articles/addNewArticle', {
    googTitle: "Dodaj lekciju",
    robots: true,
    courseList,
    admin
  })
})
// #ADDNEW:#POST:
articleRouter.post('/admin/addPost', auth, async (req, res, body) => {
  let errorMessage = ''
  // const order = await Article.findOne({}).select('order -_id').sort({ order: -1 }) || { order: 0 }
  await uploadOG(req, res, er => {
    try {
      if (req.file)
        req.body.socImage = req.file.buffer

      if (req.body.published) {
        req.body.published = true;
      }
      // req.body.order = order.order

      if (req.data.user) req.body.author = req.data.user
      if (req.body.selectedURL) req.body.selectedURL = req.body.selectedURL.toLowerCase()
        .replace(/ /gi, '-')
        .replace(/ć/gi, 'c')
        .replace(/č/gi, 'c')
        .replace(/š/gi, 's')
        .replace(/ž/gi, 'z')
        .replace(/đ/gi, 'dj')
      if (req.body.tags) req.body.tags = req.body.tags.split(',').map(x => x.trim())
      const article = new Article(req.body)
      article.save()
      generateSiteMap()
      res.redirect(302, '/admin/svi-kursevi')
    }
    catch (er) {
      console.error(er)
      res.status(418).redirect('/admin/dodaj-lekciju')
    }
  })
})

// #EDIT:#GET:
articleRouter.get('/admin/:kurs/:lekcija', auth, async (req, res) => {
  const courseList = await Course.find({ active: true }).select('-order -__v -_id -active').sort({ order: 1 })
  const admin = req.data.user

  await Article.findOne({ courseName: req.params.kurs, selectedURL: req.params.lekcija }).select('-__v').then(post => {
    if (post.socImage) {
      const buff = Buffer.from(post.socImage)
      post.displayImage = buff.toString('base64')
    }
    courseList.selected = req.params.kurs//post.courseName
    res.render('articles/editArticle', {
      post,
      googTitle: 'Izmeni lekciju',
      courseList,
      robots: true,
      admin
    })
  })
})
// #EDIT:#POST:
articleRouter.patch('/admin/edit-article/:id', auth, async (req, res) => {
  const _id = req.params.id

  await uploadOG(req, res, er => {
    try {
      if (req.file && req.body.socImage)
        req.body.socImage = req.file.buffer
      else
        delete req.body.socImage
      if (req.data.user) req.body.author = req.data.user
      if (req.body.tags) req.body.tags = req.body.tags.split(',').map(x => x.trim())
      let article = Article.findByIdAndUpdate(_id, {
        $set:
          req.body
      }, {
        new: true,
        runValidators: true
      }, function (err, doc) {
        if (err) console.error(err)
      })
      if (!article) return res.status(404).send()
      generateSiteMap()
      res.status(302).send()
    }
    catch (er) {
      console.error(er)
      res.status(500).redirect(`/admin/${req.courseName}/${req.navName}`)
    }
  })
})
// #EDIT:#POST: THISIS:#BATCH:
articleRouter.patch('/admin/batchEditLessons', auth, async (req, res) => {
  const course = req.body
  course.forEach(lesson => {
    updateEach(lesson, Article)
  })
  res.method = "GET"
  // #NOTE: it's actually redirected from the front
  res.redirect(303, 'admin/svi-kursevi/')
})

//#HELPER:
const uploadOG = multer({
  limits: {
    fileSize: 2000000,
    fieldSize: 524288000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|webp|gif)$/)) {
      return cb(new Error('To nije odgovarajuća slika'))
    }
    cb(undefined, true)
  }
}).single('socImage')

articleRouter.get('/findorder/:course/', async (req, res) => {
  let order
  const query = await Article.findOne({ courseName: req.params.course }).select('order -_id').sort({ order: -1 })
  if (!query) {
    order = 0
  }else {
    order = query.order + 1
  }
  res.send({order: order})

  // if (!order) return 0
  // return order.order + 1
})

module.exports = {
  articleRouter
}

// articleRouter.get('/admin/svi-artikli', auth, async (req, res) => {
//   const admin = req.data.user
//   const articleList = await Article.find().select('-articleContent -__v -socImage -_id -tags -googDesc -socDesc -socTitle -googTitle -created -edited -author').sort({ courseName: -1, order: 1 })
//   const publishedArticles = [], notPublished = []
//   articleList.forEach(x => {
//     if (x.published) publishedArticles.push(x)
//     else notPublished.push(x)
//   })
//   const courses = await Course.find()
//   res.render('articles/listAllArticles', {
//     googTitle: "Lista lekcija",
//     courses,
//     robots: true,
//     publishedArticles,
//     notPublished,
//     admin
//   })
// })