const mongoose      = require('mongoose')

const connectionURL = process.env.MONGO_URL


mongoose.connect(connectionURL, {
  useNewUrlParser    : true,
  useCreateIndex     : true,
  useFindAndModify   : false,
  useUnifiedTopology : true
})