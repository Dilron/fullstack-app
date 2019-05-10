require('dotenv').config()
const express = require('express')
const app = express()
const massive = require('massive')
const session = require('express-session')
const logCtrl = require('./controllers/loginRegisterController')
const postsCtrl = require('./controllers/postsController')
const stripeCtrl = require('./controllers/stripeController')

const {SESSION_SECRET, CONNECTION_STRING, SERVER_PORT} = process.env

app.use(express.json())
app.use(express.static(`${__dirname}/../build`))
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30
    }
}))

massive(CONNECTION_STRING).then(instance => {
    app.set('db', instance)
    console.log('db set')
    app.listen(SERVER_PORT, () => {
        console.log('listening on port ', SERVER_PORT)
    })
})

app.post('/auth/register', logCtrl.register)
app.post('/auth/login', logCtrl.login)
app.get('/auth/logout', logCtrl.logout)
app.get('/auth/returning-user', logCtrl.userCheck)

app.post('/request/create-new', postsCtrl.createRequest)
app.post('/request/new-bid', postsCtrl.createNewBid)

app.get('/post/read-5/:offset', postsCtrl.get5Posts)

app.post('/request/charge', stripeCtrl.createCharge)
