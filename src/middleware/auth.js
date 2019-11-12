const jwt = require('jsonwebtoken')
const Admin = require('../db/models/admin')

const auth = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token').replace('bearer', '')
    const decoded = jwt.verify(token, config.get('jwtPKey'))
    const user = await Admin.findOne({ _id: decoded._id, 'tokens.token' : token})
    console.log('auth1', token)
    if(!user) {
      throw new Error()
    }
    req.body.token = token
    req.body.user = user
    res.send(token)
    // console.log('auth2', req.token)
    next()
  } catch (er) {
    res.status(404).send({ error: "Ulogujte se"})
  }
}
module.exports = auth