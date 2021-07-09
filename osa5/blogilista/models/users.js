const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    username: { type: String, required: true , minlength: 3, unique: true },
    author: String,
    passwordHash: { type: String, required: true },
    name:  {type:String},
    blogs: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Blog'
        }
      ],
  })
  
 
  userSchema.set('toJSON', {
    transform: (_, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
  })

const User = mongoose.model('User', userSchema)


userSchema.plugin(uniqueValidator)
module.exports = User