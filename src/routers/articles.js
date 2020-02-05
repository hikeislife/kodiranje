const express = require('express')
                require('../db/mongoose')
const Article = require('../db/models/article')
const hbs     = require('hbs')

const articleRouter = new express.Router()

articleRouter.get('/admin/svi-artikli', async (req, res) => {
  const articleList = await Article.find().select('-articleContent -__v -socImage -_id -tags -googDesc -socDesc -socTitle -googTitle -created -edited -author').sort({ courseName: -1 })
  console.log(articleList)
  res.render('articles/listAllArticles', { googTitle: "Lista lekcija", robots: true, articleList })
})

articleRouter.get('/admin/:kurs/:lekcija', (req, res) => {
  Article.findOne({ courseName: req.params.kurs, selectedURL: req.params.lekcija }).select('-__v -published -_id').then(post => {
    res.render('articles/editArticle', {
      post
    })
  })
  // }).catch((er) => {
  //   res.status(418).send(er)
  // })
})

articleRouter.get('/admin/dodaj-lekciju', (req, res) => {
  res.render('articles/addNewArticle', { googTitle: "Dodaj lekciju", robots: true })
})

module.exports = {
  articleRouter
}