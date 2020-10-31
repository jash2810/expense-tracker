const db = require('../models')

// to copy paste while you create new functions
exports.hi = async (req, res, next) => {
    try {
        
        res.send('hi')

    } catch (error) {
        error.status = 400
        console.log(error);        
    }
}