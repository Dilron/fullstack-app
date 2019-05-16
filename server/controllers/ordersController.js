

module.exports = {
    createNewOrder: (req, res) => {
        const db = req.app.get('db')
        console.log('log body of create order', req.body)
        const {bidId, postId} = req.body
        const {userId} = req.session.user
        db.createNewOrder({bidId, postId, userId}).then(response => {
            res.status(200).send(response)
        }).catch(err => console.log('error creating order', err))
    },
    updatePostBidStatus: (req, res) => {
        const db = req.app.get('db')
        db.updatePostBidStatus(req.body).then(response => {
            res.status(200).send('post updated to reflect order')
        }).catch(err => console.log('error creating order', err))
    },
    getUserOrders: async (req, res) => {
        const db = req.app.get('db')
        const {userId} = req.session.user
        const sellerOrders = await db.readSellerOrders({userId}).catch(err => console.log('error getting users seller orders, ', err))
        const clientOrders = await db.readClientOrders({userId}).catch(err => console.log('error getting users client orders, ', err))
        const totalOrders = {sellerOrders, clientOrders}
        res.status(200).send(totalOrders)
    },
    updateShipOrder: async (req, res) => {
        const db = req.app.get('db')
        const newVals = await db.updateShipOrder(req.body).catch(err => console.log('error update/ship order: ', err))
        res.status(200).send(newVals[0])
    }
}