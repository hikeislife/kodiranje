const mongoose = require('mongoose')

const sectionSchema = new mongoose.Schema({
  secName: {
    type: String,
    required: [true, `Morate uneti ime`],
    trim: true,
  },
  secDesc: {
    type: String,
    required: [true, `Morate uneti ime`],
    trim: true,
  },
  courseName: {
    type: String
  },
  published: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number
  },
  secImage: {
    type: Buffer,
  }
})

const Section = mongoose.model('sections', sectionSchema)

module.exports = Section