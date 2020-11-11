const db = require('../models')

// to copy paste while you create new functions
exports.profile = async (req, res, next) => {
    try {
        
        var { userId,name } = req.body
       
        var user = await db.User.findByIdAndUpdate(userId,{
           
                'details':{
                    name: name
               
            }
        })
        console.log(user)
        if (user) {
            res.json({data:null, msg: 'user updated', success: true})
        } else {
            res.json({data: null, msg: 'user not updated', success: false})
        }

    } catch (error) {
        error.status = 400
        console.log(error);        
    }
}