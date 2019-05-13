import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import {resetReview} from '../../redDucks/bidReducer'

class ReviewPayment extends Component {

    componentDidMount(){
        this.props.resetReview()
    }

    render(){
        const {city, state, street, zip, img_ref, title, link_ref, username, bid_message, bid_val, printer, est_processing_time} = this.props.reviewInfo
        return(
            <div className='review-payment-container'>
                <div>{img_ref}</div>
                <div className='review-info-bounding'>
                    <div className='review-info-breakout'>
                        <div className='left-review-display'>
                            <h1>{username}`s bid on your post: {title} <br/> </h1>
                            <h1>{link_ref} <br/> </h1>
                            <h1>{bid_message} </h1>
                        </div>
                        <div className='right-review-display'>
                            <h1>Using: {printer} <br/> </h1>
                            <h1>to be printed an shipped in {est_processing_time} days <br/> </h1>
                            <h1>to be shipped to: <br/></h1>
                            <h1>street: {street} <br/> </h1>
                            <h1>city: {city}, state: {state} <br/> </h1>
                            <h1>ZIP: {zip} </h1>
                        </div>
                    </div>
                    <div className='checkout-bounding'>
                        <StripeProvider apiKey="pk_test_ypv91AWQYsLctkB7ZWRuHHfz008iIfansv">
                            <Elements>
                                <CheckoutForm cost={bid_val} />
                            </Elements>
                        </StripeProvider> 
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        reviewInfo: reduxState.bid.bidToReview
    }
}

const mapDispatchToProps = {
    resetReview
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewPayment)