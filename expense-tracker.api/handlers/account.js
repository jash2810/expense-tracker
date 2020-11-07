const { Model } = require('mongoose')
const db = require('../models')
const mongoose = require('mongoose')
const seeds = require('../seeds/user')

const { deleteOne } = require('../models/user')
const { credited } = require('../seeds/user')

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
        var start = req.body.start
        var end = req.body.end

        var startDate= start.split('-')
        var startNewDate = new Date(parseInt(startDate[0]),parseInt(startDate[1])-1,parseInt(startDate[2])+1)
       
        var endDate= end.split('-')
        var endNewDate = new Date(parseInt(endDate[0]),parseInt(endDate[1])-1,parseInt(endDate[2])+1)

        var user = await db.User.findById(userId,{account: 1,details: 1} )
        var credited=[],debited=[]

        credited = user.account.credited.filter(c =>{return(c.date > startNewDate && c.date < endNewDate)})
        debited = user.account.debited.filter(d =>{return(d.date > startNewDate && d.date < endNewDate)})

         res.json({credited:credited,debited:debited, msg: 'user found', success: true})
      
        
    } catch (error) {
        error.status = 400
        console.log(error);        
    }
}