const { Model } = require('mongoose')
const db = require('../models')
const mongoose = require('mongoose')
const seeds = require('../seeds/user')

const { deleteOne } = require('../models/user')

exports.credit = async (req, res, next) => {
    try {
        var {description,date,source,amount,userId}=req.body
        
        var dateArr = date.split('-')
        // yyyy-mm-dd
        console.log(dateArr)
        var newDate = new Date(parseInt(dateArr[0]), parseInt(dateArr[1]) - 1, parseInt(dateArr[2]) + 1)
                
        var user= await db.User.findByIdAndUpdate(userId, {
            $push: {
                'account.credited': {
                    description: description,
                    date: newDate,
                    source: source,
                    amount: amount,
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
        var {description,date,category,toperson,amount,userId}=req.body
        
        var dateArr = date.split('-')
        var newDate = new Date(parseInt(dateArr[0]), parseInt(dateArr[1]) - 1, parseInt(dateArr[2]) + 1)
        
        var user= await db.User.findByIdAndUpdate(userId, {
            $push: {
                'account.debited': {
                    description: description,
                    date: newDate,
                    category: category,
                    toperson: toperson,
                    amount: amount,
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
        console.log(user)
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

exports.seedCredited = async (req, res, next) => {
    try {
        // var {description,date,source,amount,userId}=req.body

        for (let i = 0; i < seeds.credited.length; i++) {
            const c = seeds.credited[i];
            var dateArr = c.date.split('-')
            // yyyy-mm-dd
            console.log(dateArr)
            var newDate = new Date(parseInt(dateArr[0]), parseInt(dateArr[1]) - 1, parseInt(dateArr[2]) + 1)
                    
            var user = await db.User.findByIdAndUpdate(c.userId, {
                $push: {
                    'account.credited': {
                        description: c.description,
                        date: newDate,
                        source: c.source,
                        amount: c.amount,
                    }
                },
                $inc: {
                    'account.balance': c.amount
                }
            })   
        }
        
    } catch (error) {
        error.status = 400
        console.log(error);
    }
}

exports.seedDebited = async (req, res, next) => {
    try {
        // var {description,date,source,amount,userId}=req.body

        for (let i = 0; i < seeds.debited.length; i++) {
            const d = seeds.debited[i];
            var dateArr = d.date.split('-')
            // yyyy-mm-dd
            console.log(dateArr)
            var newDate = new Date(parseInt(dateArr[0]), parseInt(dateArr[1]) - 1, parseInt(dateArr[2]) + 1)
                    
            var user = await db.User.findByIdAndUpdate(d.userId, {
                $push: {
                    'account.debited': {
                        description: d.description,
                        date: newDate,
                        category: d.category,
                        amount: d.amount,
                    }
                },
                $inc: {
                    'account.balance': -d.amount
                }
            })   
        }
        
    } catch (error) {
        error.status = 400
        console.log(error);
    }
}
exports.filter = async (req, res, next) => {
    try {
        var userId = req.params.id 
        var {start,end} = req.body

        var startDate= new Date(start).toISOString()
        var endDate= new Date(end).toISOString()
        console.log(startDate)
        console.log(endDate)
        
        var user = await db.User.find({
            "_id": userId,
            "account.credited": { 
              "$elemMatch": {  date:{"$gte": start,"$lt": end}  }
           }
       
         } )//.then(doc =>{
            
             res.json({data:user, msg: 'user found', success: true})
        // })
         console.log(user)
    } catch (error) {
        error.status = 400
        console.log(error);        
    }
}