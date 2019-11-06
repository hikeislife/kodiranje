const mongoose = require('mongoose')
const validator = require('validator')

const Admin = mongoose.model('admins', {
  name: {
    type: String,
    required: [true, `Morate uneti ime`],
    trim: true,
    validate(value) {
      //
    }
  },
  username: {
    type: String,
    required: [true, `Korisničko ime je obavezno polje`],
    unique: true,
    trim: true,
    validate(value) {
      //
    }
  },
  password: {
    type: String,
    required: [true, `Morate uneti lozinku`],
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password') || value.toLowerCase().includes('lozinka')) {
        throw new Error(`Ne možete koristiti ${value} u lozinci`)
      }
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error(`${value} nije dobar email :(`)
      }
    }
  }
})

module.exports = Admin