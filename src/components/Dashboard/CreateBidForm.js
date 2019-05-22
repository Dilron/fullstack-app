import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {deactivateBid, pushToBid} from '../../redDucks/bidReducer'

class CreateBidForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            newBidMessage: '',
            newBidVal: 0,
            newBidPrinter: '',
            newBidDaysEst: 0
        }
    }

    handleFormUpdate = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handelCancelBid = () => {
        this.props.pushToBid({})
        this.props.deactivateBid()
    }

    handleNewBidSubmit = async (e) => {
        e.preventDefault()
        if(this.state.newBidMessage !== '' &&
            this.state.newBidVal !== 0 &&
            this.state.newBidPrinter !== '' &&
            this.state.newBidDaysEst !== 0){
                const {user_id, post_id} = this.props.bid
                const bidBody = {...this.state, user_id, post_id}
                const res = await axios.post('/request/new-bid', bidBody)
                if(res.data === 'ok'){
                    alert('Successfully submited, the user will be notified of your bid')
                    this.props.pushToBid({})
                    this.props.deactivateBid()
                }else{
                    alert('error submitting bid')
                }
            } else {
                alert('You must fill in all fields to submit a bid')
            }
    }

    render(){
        return(
            <div className='bid-overlay'>
                <div className='bid-bounding'>
                    <div className='post-container'>
                        <img src={this.props.bid.img_ref}
                        className='post-preview-image'
                        alt='post preview' />
                        <div className='post-body-container'>
                            <div className='post-info-container'>
                                <h1><b><i>{this.props.bid.title}</i></b>, from <b><i>{this.props.bid.username}</i></b></h1>
                                <h3><u>{this.props.bid.link_ref}</u></h3>
                                <h3><i>{this.props.bid.message}</i></h3>
                            </div>
                        </div>
                    </div>
                        <h1>Create New Bid:</h1>
                        <form onSubmit={this.handleNewBidSubmit}>
                            <input name='newBidMessage'
                            type='text'
                            placeholder={`Add a message for ${this.props.bid.username}`}
                            onChange={this.handleFormUpdate} />
                            <input name='newBidVal'
                            type='number'
                            placeholder='Bid in USD'
                            onChange={this.handleFormUpdate} />
                            <input name='newBidPrinter'
                            type='text'
                            placeholder='Model of printer to be used'
                            onChange={this.handleFormUpdate} />
                            <input name='newBidDaysEst'
                            type='number'
                            placeholder='Estimated business days to produce and ship'
                            onChange={this.handleFormUpdate} />
                            <div className='bid-button-lineup'>
                                <button>Submit</button>
                                <button onClick={this.handelCancelBid}>Cancel</button>
                            </div>
                        </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) =>{
    return {
        bid: reduxState.bid.bidTargetPost
    }
}

const mapDispatchToProps = {
    deactivateBid,
    pushToBid
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBidForm) 