const mongoose = require('mongoose')
 
const UserSchema = new mongoose.Schema({
//    schema here...
}, {
    timestamps: true
})
 
module.exports = mongoose.model('User', UserSchema)