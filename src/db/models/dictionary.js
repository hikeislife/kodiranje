const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const dictSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: [true, `Morate uneti ime`],
    trim: true,
    validate(value) {
      //
    }
  },
  definition: {
    type: String,
    required: [true, `Definicija je obavezno polje`],
  },
  tags: {
    type: Array
  },
  published: {
    type: Boolean
  }
})

dictSchema.statics.findByTag = async (tag) => {
  const def = await Dictionary.findOne({ tags: tag })
  
  if(!def) {
    throw new Error('Nema rezultata')
  }
  
  return def
}

dictSchema.statics.findByTopic = async (topic) => {
  const def = await Dictionary.find({ tags: tag })
  
  if(!def) {
    throw new Error('Nema rezultata')
  }
  
  return def
}

const Dictionary = mongoose.model('dictionaries', dictSchema)

module.exports = Dictionary