require('dotenv').config()
const {STRIPE_KEY} = process.env
const stripe = require('stripe')(STRIPE_KEY)

module.exports = {
    createCharge: async (req, res) => {
        console.log('ping charge endpoint', req.body)
        const cost = +req.body.cost * 100
        console.log(cost)
    try {
      let {status} = await stripe.charges.create({
        amount: cost,
        currency: "usd",
        description: "An example charge",
        source: req.body.id
      });
  
      res.json({status});
    } catch (err) {
        // console.log(err)
      res.status(500).end();
    }
    }
}