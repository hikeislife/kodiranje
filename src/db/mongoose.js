const mongoose      = require('mongoose')

const database      = 'kodiranje'
const connectionURL = `mongodb://127.0.0.1:27017/${database}`


mongoose.connect(connectionURL, {
  useNewUrlParser    : true,
  useCreateIndex     : true,
  useUnifiedTopology : true
})