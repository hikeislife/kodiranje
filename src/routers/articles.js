const express = require('express')
const multer  = require('multer')
                require('../db/mongoose')
const Article = require('../db/models/article')
const Course  = require('../db/models/course')
const auth    = require('../middleware/auth')
const fs      = require('fs')

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
    if (post.socImage) {
      const buff = Buffer.from(post.socImage)
      post.displayImage = buff.toString('base64')
    }
    //console.log(buff.toString('base64'))
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

  await uploadOG(req, res, er => {
    try {
      if (req.file)
        req.body.socImage = req.file.buffer
      else
        delete req.body.socImage
      console.log(req.body.subSec)
      if (req.data.user) req.body.author = req.data.user
      if (req.body.tags) req.body.tags = req.body.tags.split(',').map(x => x.trim())
      let article =  Article.findByIdAndUpdate(_id, { $set: 
        req.body
      }, {
        new: true,
        runValidators: true
      }, function(err, doc) {
        if(err) console.log(err)
      })
      if (!article) return res.status(404).send()
      generateSiteMap()
      res.status(302).send()
    }
    catch (e) {
      console.log(e)
      res.status(500).redirect(`/admin/${req.courseName}/${req.navName}`)
    }
  })
})

const uploadOG = multer({
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

findOrder = async (course) => {
  const order = await Article.findOne({ courseName: course }).select('order -_id').sort({ order: -1 })
  if(!order) return 0
  return order.order + 1
}

generateSiteMap = async () => {
  const header = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n\r`
  let pages = `
  <url>
    <loc>https://www.kodiranje.in.rs/</loc>
    <lastmod>${(new Date()).toISOString().split('.')[0]}+00:00</lastmod>
    <changefreq>always</changefreq>
    <priority>1.0</priority>
  </url>\r\n`
  const close = `\n\r</urlset>`
  const data = await Article.find({published: true}).select(`-articleContent 
    -__v 
    -socImage 
    -_id 
    -tags 
    -googDesc 
    -socDesc 
    -socTitle 
    -googTitle 
    -created 
    -edited 
    -order
    -createdAt
    -navName
    -published
    -author`)
  //let otherPages = ``
  data.forEach(article => {
    pages += `
  <url>
    <loc>https://www.kodiranje.in.rs/${article.courseName}/${article.selectedURL}/</loc>
    <lastmod>${(new Date(article.updatedAt)).toISOString().split('.')[0]}+00:00</lastmod>
    <changefreq>always</changefreq>
    <priority>1.0</priority>
  </url>\r\n`
  })
  const sitemap = header + pages + close
  fs.writeFile('src/sitemap.xml', sitemap, (er) => {
    if (er) console.log(er)
  })
  console.log()
}

module.exports = {
  articleRouter
}