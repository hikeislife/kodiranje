const express = require('express')
                require('../db/mongoose')
const Article = require('../db/models/article')
const hbs     = require('hbs')

const articleRouter = new express.Router()

articleRouter.get('/admin/test', (req, res) => {
  res.send('test')
})

module.exports = {
  articleRouter
}