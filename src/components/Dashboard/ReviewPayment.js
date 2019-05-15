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
        const {bid_id, city, state, street, zip, img_ref, title, username, bid_message, bid_val, printer, est_processing_time} = this.props.reviewInfo
        return(
            <div className='review-payment-container-oct'>
                <div className='review-payment-container'>
                    <img src={img_ref} className='review-payment-image' />
                    <div className='review-info-bounding'>
                        <div className='review-info-breakout'>
                            <div className='left-review-display'>
                                <h1>Reviewing <u>{username}`s</u> bid <br/>On your post: <u>{title}</u> <br/>Using: <u>{printer}</u> </h1>
                                <h2><i>{bid_message}</i> </h2>
                            </div>
                            <div className='right-review-display'>
                                <h2>To be printed and shipped in <u>{est_processing_time}</u> days <br/> </h2>
                                <h2>and shipped to address: <br/></h2>
                                <h2><u>{street}</u>, <u>{city}</u><br/> </h2>
                                <h2><u>{state}</u>, <u>{zip}</u> </h2>
                            </div>
                        </div>
                        <div className='checkout-bounding'>
                            <StripeProvider apiKey="pk_test_ypv91AWQYsLctkB7ZWRuHHfz008iIfansv">
                                <Elements>
                                    <CheckoutForm cost={bid_val} bidId={bid_id} resetReview={this.props.resetReview} />
                                </Elements>
                            </StripeProvider> 
                        </div>
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