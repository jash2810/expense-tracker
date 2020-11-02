const { Model } = require('mongoose')
const db = require('../models')
const mongoose = require('mongoose')

const { deleteOne } = require('../models/user')

exports.credit = async (req, res, next) => {
    try {
        var {description,date,source,amount,duedate,userId}=req.body
        // dd-mm-yyyy
        console.log(userId)
        var newDate = new Date(date.split('-')[2] + '-' + date.split('-')[1] +'-'+ date.split('-')[0])
        var newMonth = newDate.getMonth() + 1
        var newYear = newDate.getFullYear()
       

        var newDueDate = new Date(duedate.split('-')[2] + '-' + duedate.split('-')[1] +'-'+ duedate.split('-')[0])
        
        var user= await db.User.findByIdAndUpdate(userId, {
            $push: {
                'account.credited': {
                   month: newMonth,
                    year: newYear,
                    description: description,
                    date: newDate,
                    source: source,
                    amount: amount,
                    duedate: duedate !== '' ? newDueDate : '',
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
        var {description,date,category,toperson,amount,duedate,userId}=req.body
        // dd-mm-yyyy
        var newDate = new Date(date.split('-')[2] + '-' + date.split('-')[1] +'-'+ date.split('-')[0])
        var newMonth = newDate.getMonth() + 1
        var newYear = newDate.getFullYear()

        var newDueDate = new Date(duedate.split('-')[2] + '-' + duedate.split('-')[1] +'-'+ duedate.split('-')[0])
        
        var user= await db.User.findByIdAndUpdate(userId, {
            $push: {
                'account.debited': {
                    month: newMonth,
                    year: newYear,
                    description: description,
                    date: newDate,
                    category: category,
                    toperson: toperson,
                    amount: amount,
                    duedate: duedate !== '' ? newDueDate : '',
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
        var { userId } = req.params
       
        var user = await db.User.findById(userId)

        if (user) {
            res.json({data:user, msg: 'user found', success: true})
        } else {
            res.json({data: null, msg: 'user not found', success: false})
        }
    } catch (error) {
        error.status = 400
        console.log(error);        
    }
}