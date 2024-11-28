const express = require('express')
require('../db/mongoose')
const auth = require('../middleware/auth')


const dictRouter = new express.Router()

// app.get('/recnik', (req, res) => {
//   res.send('rečnik')
// })

dictRouter.get('/recnik', auth, async (req, res) => {
  res.render('dictionary/newDictionary', {
    admin: true,
    title: "Kodiranje",
  })
})

module.exports = {
  dictRouter
}
