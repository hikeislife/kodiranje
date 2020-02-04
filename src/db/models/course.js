const mongoose = require('mongoose')
const validator = require('validator')


insertDashes = (string) => {
  return string.replace(/ /gi, '-')
} 

//const Course = mongoose.model('Courses', {
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `Ime kursa je obavezno polje`],
    unique: true,
    trim: true
  },
  setId: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    set: insertDashes
  },
  active: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    required: [true, `Redosled prikaza kursa je obavezno polje`],
    // unique: true,
    validate(value) {
      if (value < 0) {
        throw new Error('Ovaj broj mora biti pozitivan :(')
      }
    }
  }
})

const Course = mongoose.model('courses', courseSchema)

module.exports = Course