const jwt   = require('jsonwebtoken')
const Admin = require('../db/models/admin')

const auth = async (req, res, next) => {
  // try {
  //   console.log('auth', req.token)
  //   const token = req.header('x-auth-token').replace('bearer', '')
  //   const decoded = jwt.verify(token, config.get('jwtPKey'))
  //   const user = await Admin.findOne({ _id: decoded._id, 'tokens.token' : token})
  //   if(!user) {
  //     throw new Error()
  //   }
  //   req.body.token = token
  //   req.body.user = user
  //   res.send(token)
    next()
  // } catch (er) {
  //   res.status(404).send({ error: "Ulogujte se"})
  // }
}
module.exports = auth