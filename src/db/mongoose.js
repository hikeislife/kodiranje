const mongoose      = require('mongoose')

const database      = 'kodiranje'
const connectionURL = `mongodb://127.0.0.1:27017/${database}`


mongoose.connect(connectionURL, {
  useNewUrlParser    : true,
  useCreateIndex     : true,
  useUnifiedTopology : true
})








// const course = new Course({
//   name: "JavaScript",
//   active: true,
//   order: 2
// })

// course.save().then((k) => {
//   console.log(`Kurs ${k} uspešno dodat`)
// }).catch((er) => {
//   console.log('Greška, kurs nije dodat', er)
// })



// const user = new User({
//   name: "Igor",
//   username: "I",
//   password: "lozinka",
//   email: "iG@kodiranje.in.rs"
// })

// user.save().then((u) => {
//   console.log(u)
// }).catch(er => {
//   console.log("Greška", er)
// })