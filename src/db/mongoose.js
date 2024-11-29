const mongoose = require('mongoose')

const connectionURL = process.env.MONGO_URL
const connectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}

try {
  mongoose.connect(connectionURL, connectionOptions)
  .then(() => {console.log('connected')})
  .catch(er => {console.error(er)})
  console.info('Connected to MongoDB')
  mongoose.set('debug', true)
} catch (error) {
  console.error(error)
}