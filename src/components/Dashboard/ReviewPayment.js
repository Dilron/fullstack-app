import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import {resetReview} from '../../redDucks/bidReducer'
import axios from 'axios'

class ReviewPayment extends Component {

    componentDidMount(){
        this.props.resetReview()
    }

    handleCreateOrder = () => {
        const {bid_id : bidId, post_id : postId} = this.props.reviewInfo
        axios.post('/order/new', {bidId, postId}).then(res => {
            console.log('order created ', res)
        }).catch(err => console.log('error creating order: ', err))
    }

    render(){
        const {bid_id, city, state, street, zip, img_ref, title, username, bid_message, bid_val, printer, est_processing_time} = this.props.reviewInfo
        console.log('log from review render ', bid_id)
        return(
            <div className='review-payment-container-oct'>
                <div className='review-payment-container'>
                {bid_id
                ?
                    (<>
                    <img src={img_ref} className='review-payment-image' />
                    <div className='review-info-bounding'>
                        <div className='review-info-breakout'>
                                <h1>Reviewing <b><i>{username}`s</i></b> bid <br/></h1>
                                <h1>On your post: <b><i>{title}</i></b> <br/></h1>
                                <h1>Using: <i>{printer}</i> </h1>
                                <h2><i>{bid_message}</i> </h2>
                                <h2>To be printed and shipped in <b><i>{est_processing_time}</i></b> days <br/> 
                                and shipped to address: <br/>
                                <b><i>{street}</i></b>, <b><i>{city}</i></b><br/>
                                <b><i>{state}</i></b>, <b><i>{zip}</i></b> </h2>
                        </div>
                        
                            <StripeProvider apiKey="pk_test_ypv91AWQYsLctkB7ZWRuHHfz008iIfansv">
                                <Elements>
                                    <CheckoutForm cost={bid_val} 
                                    bidId={bid_id} 
                                    resetReview={this.props.resetReview}
                                    handleCreateOrder={this.handleCreateOrder} />
                                </Elements>
                            </StripeProvider> 
                        
                    </div>
                    </>)
                :
                (<div>Select a bid to review</div>)
                }
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