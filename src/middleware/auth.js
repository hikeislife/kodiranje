const jwt = require('jsonwebtoken')
const Admin = require('../db/models/admin')

const auth = async (req, res, next) => {
  try {
    const cookie = await req.header('Cookie')

    const cookies = cookie.split(';')
    let token = ''
    cookies.forEach(x => {
      if (x.split('=')[0].includes('token')) {
        token = x.split('=')[1]
      }
    })
    // console.log(`iz auth ${token}`)
    const decoded = jwt.verify(token, process.env.JWT_P_KEY)

    const admin = await Admin.findOne({
      _id: decoded._id,
      'tokens.token': token
    })
    if (!admin) {
      throw new Error()
    }
    req.data = req.data || {}
    req.data.user = admin.name
    next()
  } catch (er) {

    // console.log('there be an error matey: ' + er)
    res.status(403).redirect('/admin')
  }
}
module.exports = auth