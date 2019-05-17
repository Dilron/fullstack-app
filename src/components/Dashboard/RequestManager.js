import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {pushToReview} from '../../redDucks/bidReducer'

class RequestManager extends Component {
    constructor(props){
        super(props)
        this.state = {
            requestsDisplay: [],
            requestsOffset: 0,
            bidsDisplay: [],
            loadingReqs: true
        }
    }

    async componentDidMount(){
        const reqs = await axios.get(`/post/read/user-reqs/${this.props.userId}`)
        this.setState({requestsDisplay: reqs.data, loadingReqs: false})
    }

    handleShowBids = async (postId) => {
        console.log('react log post id', postId)
        const bids = await axios.get(`/post/read/recieved-bids/${postId}`)
        console.log(bids.data)
        this.setState({bidsDisplay: bids.data})
    }

    handleToReview = async (bidObj) => {
        let shipReq = await axios.get(`/post/read/shipping/${bidObj.post_id}`).catch(err => console.log('error in handle review: ', err))
        let {city, state, street, zip} = shipReq.data[0]
        console.log('log shipReq in handlereview: ', city, state, street, zip)
        let pIndex = this.state.requestsDisplay.findIndex((ele) => {
            return ele.post_id === bidObj.post_id
        })
        let {img_ref, title, link_ref} = this.state.requestsDisplay[pIndex]
        let {post_id, bid_id, username, bid_message, bid_val, printer, est_processing_time} = bidObj
        const revObj = {post_id, bid_id, city, state, street, zip, img_ref, title, link_ref, username, bid_message, bid_val, printer, est_processing_time}
        this.props.pushToReview(revObj)
    }

    render(){
        return(
            <div className='req-manager-container'>
            {this.state.loadingReqs && <h1>Loading</h1> }
                <div className='req-manager-display'>
                    {this.state.requestsDisplay.map((ele, i) => {
                        return (
                            <div className='post-container-oct' key={i}>
                                <div className='post-container'  >
                                    <img className='post-preview-image' src={ele.img_ref} />
                                    <div className='post-body-container'>
                                        <div className='post-info-container'>
                                            <h1><b><i>{ele.title}</i></b></h1>
                                            <h3><u>{ele.link_ref}</u></h3>
                                            <h3><i>{ele.message}</i></h3>
                                        </div>
                                    <button onClick={() => this.handleShowBids(ele.post_id)}>Show Bids</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='req-manager-bid-container'>
                    {this.state.bidsDisplay.map((ele, i) => {
                        return (
                            <div className='req-manager-bid-display-oct' key={i}>
                                <div className='req-manager-bid-display' >
                                    <div>
                                        <h1>Bid from: <b><i>{ele.username}</i></b> </h1>
                                        <h3><i>{ele.bid_message}</i></h3>
                                    </div>
                                    <div>
                                        <h2>Cost: <b><i>${ele.bid_val}</i></b>,   Printer: <b><i>{ele.printer}</i></b> <br/> </h2>
                                        <h2>Estimated to print and ship in <b><i>{ele.est_processing_time}</i></b> days</h2>
                                        <button onClick={() => this.handleToReview(ele)} >Review and Pay</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        userId: reduxState.user.userId
    }
}

const mapDispatchToProps = {
    pushToReview
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestManager) 