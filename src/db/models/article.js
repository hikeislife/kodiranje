const mongoose = require('mongoose')
const validator = require('validator')

// const Article = mongoose.model('Article', {
const articleSchema = new mongoose.Schema({
  selectedURL: { /* Naziv članka, ne prikazuje se na strani već je deo url-a */
    type: String,
    required: [true, `Naziv članka je obavezno polje`]
  },
  navName: {
    type: String,
    required: [true, `Polje je obavezno`]
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
  courseName: {
    type: String,
    required: [true, `Polje je obavezno`]
  },
  tags: {
    type: Array
  },
  published: {
    type: Boolean,
    default: false
  },
  author: {
    type: String,
    default: 'K',
    required: [true, `Autor je obavezno polje`]
  },
  // SEO
  googTitle: {
    type: String,
    //
  },
  googDesc: {
    type: String,
    default: `Nauči da kodiraš, šta ćeš drugo da radiš?`
  },
  // og tags
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
  },
  articleContent: {
    type: String,
    required: [true, `Text artikla je obavezno polje`]
  },
}, {
  timestamps: true
})

const Article = mongoose.model('articles', articleSchema)

module.exports = Article