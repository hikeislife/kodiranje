const jwt = require('jsonwebtoken')
const Admin = require('../db/models/admin')

const auth = async (req, res, next) => {
  try {
    const token =  req.header('Authorization').replace('bearer', '') || req.header('x-auth-token')
    // const token = 555
    const decoded = jwt.verify(token, 'kodiranje')
    const user = await Admin.findOne({ _id: decoded._id, 'tokens.token' : token})
    // console.log('auth1', token)
    res.send(token)
    if(!user) {
      throw new Error()
    }
    // if (req.method === 'GET') {
    //   req.body.auth = true
    // }
    req.body.token = token
    req.body.user = user
    
    // console.log('auth2', req.token)
    next()
  } catch (er) {
    res.status(404).send({ error: "Ulogujte se"})
  }
}
module.exports = auth