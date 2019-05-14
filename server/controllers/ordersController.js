

module.exports = {
    createNewOrder: (req, res) => {
        const db = req.app.get('db')
        console.log('log body of create order', req.body)
        db.createNewOrder(req.body).then(response => {
            res.status(200).send('order created')
        }).catch(err => console.log('error creating order', err))
    },
    updatePostBidStatus: (req, res) => {
        const db = req.app.get('db')
        db.updatePostBidStatus(req.body).then(response => {
            res.status(200).send('post updated to reflect order')
        }).catch(err => console.log('error creating order', err))
    }
}