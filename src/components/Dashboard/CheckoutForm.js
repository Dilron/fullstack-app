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
    await axios.post('/charge', chargeBody).then(res => {
        console.log('ping charge success')
    }).catch(err => console.log('ping charge err: ', err))
  }

  handleInput = (e) => {
      this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <div className="checkout">
        <h4>Amount: {this.props.cost} </h4>
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);