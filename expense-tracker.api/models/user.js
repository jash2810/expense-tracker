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
    },
    account: {
        credited: [{
            month: {type: Number, required: false},
            year: {type: Number, required: false},
            description: {type: String, required: true},
            date: {type: Date, default: Date.now},
            source: {type: String, required: false},
            amount: {type: Number},
            dueDate: {type: Date, required: false}
        }],
        debited: [{
            month: {type: Number, required: false},
            year: {type: Number, required: false},
            description: {type: String, required: true},
            date: {type: Date, default: Date.now},
            category: {type: String, default: 'none', required: true},
            toPerson: {type: String, required: false},
            amount: {type: Number, required: true},
            dueDate: {type: Date, required: false}
        }],
        // sum total
        balance: {type: Number, default: 0}
    }
}, {
    timestamps: true
})
 
module.exports = mongoose.model('User', UserSchema)