const express = require('express')
                require('../db/mongoose')
const Article = require('../db/models/article')
const Course  = require('../db/models/course')
const hbs     = require('hbs')

const articleRouter = new express.Router()

articleRouter.get('/admin/svi-artikli', async (req, res) => {
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
    notPublished })
})

articleRouter.get('/admin/:kurs/:lekcija', async (req, res) => {
  const courseList = await Course.find({ active: true }).select('-order -__v -_id -active').sort({ order: 1 })
  
  await Article.findOne({ courseName: req.params.kurs, selectedURL: req.params.lekcija }).select('-__v').then(post => {
    courseList.selected = req.params.kurs//post.courseName
    console.log(req.params.kurs)
    res.render('articles/editArticle', {
      post, 
      courseList,
      robots: true
    })
  })
  // }).catch((er) => {
  //   res.status(418).send(er)
  // })
})

articleRouter.patch('/admin/edit-article/:id', async (req, res) => {
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

articleRouter.get('/admin/dodaj-lekciju', async (req, res) => {
  const courseList = await Course.find({ active: true }).select('-order -__v -_id -active').sort({ order: 1 })

  res.render('articles/addNewArticle', { 
    googTitle: "Dodaj lekciju", 
    robots: true, 
    courseList })
})

articleRouter.post('/admin/addPost', async (req, res, body) => {
  if (req.body.published) {
    req.body.published = true;
  }
  req.body.order = await findOrder(req.body.courseName)
  req.body.selectedURL = req.body.selectedURL.toLowerCase().replace(/ /gi, '-')
  req.body.tags = req.body.tags.split(',').map(x => x.trim())
  const article = new Article(req.body)
  try {
    await article.save()
    res.redirect(302, '/admin/svi-artikli')
  } catch (e) {
    res.status(418).render('articles/addNewArticle', { errorMessage: e.errmsg, googTitle: "Dodaj lekciju", robots: true })
    console.log(e)
  }
})

findOrder = async (course) => {
  const order = await Article.findOne({ courseName: course }).select('order -_id').sort({ order: -1 })
  if(!order) return 0
  return order.order + 1
}

module.exports = {
  articleRouter
}