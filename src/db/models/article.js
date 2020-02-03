const mongoose = require('mongoose')
const validator = require('validator')

// const Article = mongoose.model('Article', {
const articleSchema = new mongoose.Schema({
  navName: {
    type: String,
    required: [true, `Polje je obavezno`]
  },
  courseName: {
    type: String,
    required: [true, `Polje je obavezno`]
  },
  selectedURL: {
    type: String,
    required: [true, `URL je obavezno polje`]
  },
  tags: {
    type: Array
  },
  published: {
    type: Boolean,
    default: false
  },
  // created: {
  //   type: String,
  //   required: [true, `Datum posta je obavezno polje`]
  // },
  // edited: {
  //   type: String,
  //   //
  // },
  author: {
    type: String,
    required: [true, `Autor je obavezno polje`]
  },
  googTitle: {
    type: String,
    //
  },
  googDesc: {
    type: String,
    default: `Nauči da kodiraš, šta ćeš drugo da radiš?`
  },
  socTitle: {
    type: String,
    default: `Nauči da kodiraš, šta ćeš drugo da radiš?`
  },
  socDesc: {
    type: String,
    default: `Nauči da kodiraš, šta ćeš drugo da radiš?`
  },
  socImage: {
    type: Buffer,
    //
  },
  order: {
    type: Number,
    required: [true, `Redosled je obavezno polje`],
    validate(value) {
      if (value < 0) {
        throw new Error(`Redosled ne može biti negativan`)
      }
    }
  },
  articleContent: {
    type: String,
    required: [true, `Text artikla je obavezno polje`]
  }/*, soc: {
    type: Buffer
  }*/
}, {
  timestamps: true
})

const Article = mongoose.model('articles', articleSchema)

module.exports = Article