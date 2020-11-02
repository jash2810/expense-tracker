const { Model } = require('mongoose')
const db = require('../models')
const mongoose = require('mongoose')

const { deleteOne } = require('../models/user')

exports.credit = async (req, res, next) => {
    try {
        var {description,date,source,amount,dueDate,userId}=req.body
        // dd-mm-yyyy
        var newDate = new Date(date.split('-')[2] + '-' + date.split('-')[1] +'-'+ date.split('-')[0])
        var newMonth = newDate.getMonth() + 1
        var newYear = newDate.getFullYear()

        var newDueDate = new Date(dueDate.split('-')[2] + '-' + dueDate.split('-')[1] +'-'+ dueDate.split('-')[0])
        
        var user= await db.User.findByIdAndUpdate(userId, {
            $push: {
                'account.credited': {
                    month: newMonth,
                    year: newYear,
                    description: description,
                    date: newDate,
                    source: source,
                    amount: amount,
                    dueDate: dueDate !== '' ? newDueDate : '',
                }
            },
            $inc: {
                'account.balance': amount
            }
        })        
            
        res.json({data: user, msg: "account credited", success: true})              
      

    } catch (error) {
        error.status = 400
        console.log(error);        
    }
}
exports.debit = async (req, res, next) => {
    try {
        var {description,date,category,toPerson,amount,dueDate,userId}=req.body
        // dd-mm-yyyy
        var newDate = new Date(date.split('-')[2] + '-' + date.split('-')[1] +'-'+ date.split('-')[0])
        var newMonth = newDate.getMonth() + 1
        var newYear = newDate.getFullYear()

        var newDueDate = new Date(dueDate.split('-')[2] + '-' + dueDate.split('-')[1] +'-'+ dueDate.split('-')[0])
        
        var user= await db.User.findByIdAndUpdate(userId, {
            $push: {
                'account.debited': {
                    month: newMonth,
                    year: newYear,
                    description: description,
                    date: newDate,
                    category: category,
                    toPerson: toPerson,
                    amount: amount,
                    dueDate: dueDate !== '' ? newDueDate : '',
                }
            },
            $inc: {
                'account.balance': -amount
            }
        })        
            
        res.json({data: user, msg: "account debited", success: true})              
      

    } catch (error) {
        error.status = 400
        console.log(error);        
    }
}

exports.search = async (req, res, next) => {
    try {
        var userId=req.body
       
        if (mongoose.Types.ObjectId.isValid(userId)) {

            var user=await db.User.findById(mongoose.Types.ObjectId(userId))
            
            if (user) {
                res.json({data: user,msg:"user found",success:true})
            }
            else{
                res.json({data: null,msg:"user not found",success:false})
                
            }
        }
        else {
            res.json({data: null,msg:"enter valid id",success:true})
        }
        
    } catch (error) {
        error.status = 400
        console.log(error);        
    }
}
exports.all = async (req, res, next) => {
    try {
        
        
    } catch (error) {
        error.status = 400
        console.log(error);        
    }
}