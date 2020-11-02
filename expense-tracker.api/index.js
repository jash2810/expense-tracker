require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const handle = require('./handlers')
const routes = require('./routes')
//const { route } = require('./routes/auth')
// const { route} =require('./routes/account')

const app = express()
// const port = process.env.PORT
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  
const port = process.env.PORT || 4000

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/user', routes.user)
app.use('/auth', routes.auth)
app.use('/account',routes.account)

app.use(handle.notFound)
app.use(handle.errors)

app.listen(port, console.log(`Server started on port ${port}...`))