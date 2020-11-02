const db = require('../models')

// to copy paste while you create new functions
exports.login = async (req, res, next) => {
    try {
        var {email,password}=req.body
        console.log(req.body)
        var user= await db.User.findOne({'cred.email': email})
        console.log(user)

        if(user)
        {
            if (user.cred.password === password) {
                res.json({data: user,msg:"login success",success: true})
                
            } else {
                res.json({data: null,msg:"Password is not correct",success: false})
                
            }
                
        }
        else{
            res.json({data: null,msg: "user not found",success: false})
        }

    } catch (error) {
        error.status = 400
        console.log(error);        
    }
}

exports.register = async (req, res, next) => {
    try {

        var {email,password,name,dob}=req.body
        var user=db.User()

        user.details.name=name
        user.details.dob=dob
        user.cred.email=email
        user.cred.password=password

        user.save()

        res.json({data: user, msg: 'user registered' , success: true})
    
        
    } catch (error) {
        error.status = 400
        console.log(error);      
    }
}