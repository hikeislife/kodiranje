const express = require('express')
const multer  = require('multer')
                require('../db/mongoose')
const Article = require('../db/models/article')
const Course  = require('../db/models/course')
const auth    = require('../middleware/auth')

const articleRouter = new express.Router()

articleRouter.get('/admin/svi-artikli', auth, async (req, res) => {
  const admin = req.data.user
  const articleList = await Article.find().select('-articleContent -__v -socImage -_id -tags -googDesc -socDesc -socTitle -googTitle -created -edited -author').sort({ courseName: -1, order: 1 })
  const publishedArticles = [], notPublished = []
  articleList.forEach(x => {
    if(x.published) publishedArticles.push(x)
    else notPublished.push(x)
  })
  res.render('articles/listAllArticles', { 
    googTitle: "Lista lekcija", 
    robots: true, 
    publishedArticles, 
    notPublished,
    admin })
})

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

articleRouter.post('/admin/addPost', auth, async (req, res, body) => {
  let errorMessage = ''
  const order = await Article.findOne({}).select('order -_id').sort({ order: -1})
  await uploadOG(req, res, er => {
    try {
      if (req.file)
        req.body.socImage = req.file.buffer
        
      if (req.body.published) {
        req.body.published = true;
      }

      req.body.order = order.order + 1
      if (req.data.user) req.body.author = req.data.user
      if (req.body.selectedURL) req.body.selectedURL = req.body.selectedURL.toLowerCase().replace(/ /gi, '-')
      if (req.body.tags) req.body.tags = req.body.tags.split(',').map(x => x.trim())
      const article = new Article(req.body)
      article.save()
      res.redirect(302, '/admin/svi-artikli')
    }
    catch (e) {
      console.log(e)
      res.status(418).redirect('/admin/dodaj-lekciju')
    }
  })
})

articleRouter.get('/admin/:kurs/:lekcija', auth, async (req, res) => {
  const courseList = await Course.find({ active: true }).select('-order -__v -_id -active').sort({ order: 1 })
  const admin = req.data.user
  
  await Article.findOne({ courseName: req.params.kurs, selectedURL: req.params.lekcija }).select('-__v').then(post => {
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

articleRouter.patch('/admin/edit-article/:id', auth, async (req, res) => {
  const _id = req.params.id
  try {
    let article = await Article.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true
    })

    if (!article) return res.status(404).send()

    article = await Article.findById(_id)
    res.redirect(303, `/${article.courseName}/${article.selectedURL}`)
  } catch (e) {
    console.log(e)
    res.status(500).send()
  }
})

const uploadOG = multer({
  //dest: './src/imgs/og/',
  limits: {
    fileSize:  2000000,
    fieldSize: 524288000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|webp|gif)$/)) {
      return cb(new Error('To nije odgovarajuća slika'))
    }
    cb(undefined, true)
  }
}).single('socImage')

// articleRouter.post('/admin/og-upload', auth, upload.single('socImage'), async (req, res, next) => {
//   // need to pass current article id
//   //req.article.socImage = req.file.buffer
//   //await req.article.save()
//   console.log(req)
//   res.send()
// }, (err, req, res, next) => {
//   res.status(400).send({
//     errorMessage: err.message
//   })
// })

findOrder = async (course) => {
  const order = await Article.findOne({ courseName: course }).select('order -_id').sort({ order: -1 })
  if(!order) return 0
  return order.order + 1
}

module.exports = {
  articleRouter
}