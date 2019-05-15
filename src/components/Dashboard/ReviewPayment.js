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
                    <img src={img_ref} className='post-preview-image' />
                    <div className='review-info-bounding'>
                        <div className='review-info-breakout'>
                            <div className='left-review-display'>
                                <h1><u>{username}`s</u> bid<br/> on your post: <u>{title}</u> <br/> </h1>
                                <h3><i>{bid_message}</i> </h3>
                            </div>
                            <div className='right-review-display'>
                                <h1>Using: <u>{printer}</u> <br/> </h1>
                                <h1>to be printed an shipped in <u>{est_processing_time}</u> days <br/> </h1>
                                <h1>to be shipped to: <br/></h1>
                                <h2>{street} <br/> </h2>
                                <h2>{city}, {state} <br/> </h2>
                                <h2>{zip} </h2>
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