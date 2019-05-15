import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios'

class CheckoutForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//         costInput: 0
//     }
//   }

  submit = async (ev) => {
    ev.preventDefault()
    const {token} = await this.props.stripe.createToken({name: "Name"});
    console.log(token.id)
    const chargeBody = {id: token.id, cost: this.props.cost}
    const chargeOk = await axios.post('/charge', chargeBody).catch(err => console.log('ping charge err: ', err))
    console.log('submit log props', this.props)
    const {bidId} = this.props
    console.log('submit log bidId', bidId)
    if(chargeOk.status === 200){
        axios.post('/order/new', {bidId}).then(res => {
            console.log('order created ', res)
        }).catch(err => console.log('error creating order: ', err))
        axios.put('/order/request', {bidId}).then(res => {
            console.log('post status updated', res)
        }).catch(err => console.log('error updating post status: ', err))
        this.props.resetReview()
    }
  }

  handleInput = (e) => {
      this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <div className="checkout">
        <h1>Total Cost: $<u>{this.props.cost}</u> </h1>
        <h2>Would you like to complete the transaction?</h2>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);