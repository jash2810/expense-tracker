const mongoose = require('mongoose')
 
const UserSchema = new mongoose.Schema({
//    schema here...
    details: {
        name: {type: String, required: true},
        dob: {type: String, required: false}
    },
    cred: {
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true}
    }
}, {
    timestamps: true
})
 
module.exports = mongoose.model('User', UserSchema)