

module.exports = {
    createRequest:(req, res) => {
        const db = req.app.get('db')
        console.log('log session: ', req.session)
        const idVal = req.session.user.userId
        let request = { userId: idVal, ...req.body}
        console.log('log request: ', request)
        db.createNewRequest(request).then(response => {
            res.status(200).send(response)
        }).catch(err => console.log('error in create request: ', err))
    },
    get5Posts: (req, res) => {
        const db = req.app.get('db')
        const offset = req.params.offset
        db.read5Posts({offset}).then(response => [
            res.status(200).send(response)
        ]).catch(err => console.log('error getting 5 posts: ', err))
    },
    createNewBid: (req, res) => {
        const db = req.app.get('db')
        const bidderId = {bidderId: req.session.user.userId}
        db.createNewBid({...req.body, ...bidderId}).then(response => {
            console.log('log new bid response: ', response)
            res.status(200).send('ok')
        }).catch(err => console.log('error creating new bid: ', err))
    },
    getRequests: (req, res) => {
        const db = req.app.get('db')
        const id = req.params.id
        console.log('server log getReq userId ', id)
        db.readReqsById({id}).then(response => {
            res.status(200).send(response)
        }).catch(err => console.log('error getting reqs: ', err))
    },
    getBids: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.readBidsById({id}).then(response => {
            res.status(200).send(response)
        }).catch(err => console.log('error getting bids ', err))
    }
}