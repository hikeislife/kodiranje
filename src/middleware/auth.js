const jwt   = require('jsonwebtoken')
const Admin = require('../db/models/admin')

const auth = async (req, res, next) => {
  try {
    const token = await req.header('x-token')//.replace('bearer', '')
    console.log(token)
    //const token = await req.header('Authorization').replace('bearer', '')
    // console.log('auth', token)
    const decoded = jwt.verify(token, process.env.JWT_P_KEY)
    console.log(decoded._id)
    const admin = await Admin.findOne({ _id: decoded._id, 'tokens.token' : token})
    if(!admin) {
      throw new Error()
    }
  //   req.body.token = token
    req.body.admin = admin
  //   res.send(token)
    return next()
  } catch (er) {
    console.log('there be an error matey: ' + er)
    
    //res.status(404).send({ error: "Ulogujte se"})
  }
}
module.exports = auth