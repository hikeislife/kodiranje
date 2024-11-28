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
  console.info('Connected to MongoDB')
} catch (error) {
  console.error(error)
}