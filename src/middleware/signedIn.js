const jwt = require('jsonwebtoken')
const Admin = require('../db/models/admin')

const signedIn = async (req, res, next) => {
  try {
    const cookie = await req.header('Cookie')
    const cookies = cookie.split(';')

    let token = ''
    cookies.forEach(x => {
      if (x.split('=')[0] === 'token') token = x.split('=')[1]
    })

    const decoded = jwt.verify(token, process.env.JWT_P_KEY)

    const admin = await Admin.findOne({
      _id: decoded._id,
      'tokens.token': token
    })
    //console.info(`from signedIn.js ${admin}`)
    if (!admin) {
      throw new Error()
    }
    res.redirect('/admin/svi-kursevi')
  } catch (er) {
    // console.info(`iz signedin ${er}`)
    next()
  }
}


module.exports = signedIn