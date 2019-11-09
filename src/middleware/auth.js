const jwt = require('jsonwebtoken')
const Admin = require('../db/models/admin')

const auth = async (req, res, next) => {
  try {
    const token =  req.header('Authorization').replace('bearer', '')
    const decoded = jwt.verify(token, 'kodiranje')
    const user = await Admin.findOne({ _id: decoded._id, 'tokens.token' : token})
    if(!user) {
      throw new Error()
    }
    req.token = token
    req.user = user
    next()
  } catch (er) {
    res.status(404).send({ error: "Ulogujte se"})
  }
}
module.exports = auth