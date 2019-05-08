

module.exports = {
    createRequest: async (req, res) => {
        const db = req.app.get('db')
        let reqBody = {...req.body}
        console.log(reqBody)
        const set = await db.createNewRequest({...req.body})
        res.status(200).send(set)
    }
}