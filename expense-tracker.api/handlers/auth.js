const db = require('../models')

// to copy paste while you create new functions
exports.login = async (req, res, next) => {
    try {
        
        res.send('login')

    } catch (error) {
        error.status = 400
        console.log(error);        
    }
}

exports.register = async (req, res, next) => {
    try {
        res.json({data: req.body, msg: 'done' , success: true})
    } catch (error) {
        error.status = 400
        console.log(error);      
    }
}