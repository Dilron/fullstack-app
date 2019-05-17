require('dotenv').config()
const express = require('express')
const app = express()
const massive = require('massive')
const session = require('express-session')
const logCtrl = require('./controllers/loginRegisterController')
const postsCtrl = require('./controllers/postsController')
const stripeCtrl = require('./controllers/stripeController')
const bsCtrl = require('./controllers/bullshitController')
const ordersCtrl = require('./controllers/ordersController')

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
app.get('/post/read/user-reqs/:id', postsCtrl.getRequests)
app.get('/post/read/recieved-bids/:id', postsCtrl.getBids)
app.get('/post/read/shipping/:id', postsCtrl.getShipping)

app.post('/order/new', ordersCtrl.createNewOrder)
app.put('/order/request', ordersCtrl.updatePostBidStatus)
app.get('/order/user-associated', ordersCtrl.getUserOrders)
app.put('/order/ship', ordersCtrl.updateShipOrder)
app.get('/order/carousel', ordersCtrl.getThreeOrders)

app.post('/request/charge', stripeCtrl.createCharge)

app.post('/charge', bsCtrl.createCharge);
