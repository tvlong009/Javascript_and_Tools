import mongoose from 'mongoose'
const {Schema} = mongoose

export default mongoose.model('User', new Schema({
  username: {type: String, unique: true},
  name: String,
  password: String,
  balance: Number,
  stocks: [{
    code: String,
    quantity: Number
  }]
}))
