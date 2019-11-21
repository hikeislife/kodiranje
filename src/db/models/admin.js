const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
//const config = require('config')

const adminSchema = new mongoose.Schema({
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
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})

adminSchema.statics.findByCredentials = async (username, password) => {
  const user = await Admin.findOne({ username })
  
  if(!user) {
    throw new Error('Ime ili password nisu dobri')
  }
  const validPassword = await bcrypt.compare(password, user.password)
  
  if(!validPassword) {
    throw new Error('Ime ili password nisu dobri')
  }
  return user
}

adminSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, config.get('jwtPKey'), { expiresIn: '1m'})

  user.tokens = user.tokens.concat({token})
  await user.save()
  return token
}

adminSchema.pre('save', async function (next) {
  const admin = this
  if(admin.isModified('password')) {
    admin.password = await bcrypt.hash(admin.password, 8)
  }
  next()
})

const Admin = /*mongoose.models.Admin || */mongoose.model('admins', adminSchema)

module.exports = Admin