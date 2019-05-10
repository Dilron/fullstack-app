import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

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

    componentDidMount(){
        //.get bid info from passed post_id + user_id
    }

    handleFormUpdate = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleNewBidSubmit = (e) => {
        e.preventDefault()
        //.post bid info to database
    }

    render(){
        return(
            <div className='bid-overlay'>
                <div className='post-container'>
                    <h1>Image standin: <br/> {this.props.img_ref} </h1>
                    <div className='post-body-container'>
                        <div className='post-info-container'>
                            <h1>{this.props.title}, from {this.props.username}</h1>
                            <h3>{this.props.link_ref}</h3>
                            <h3>{this.props.message}</h3>
                        </div>
                        {!this.props.bid_accepted &&
                        <button onClick={() => this.handleMakeBid()} >Make Bid</button>}
                    </div>
                </div>
                <h1>Create New Bid:</h1>
                <form>
                    <input name='newBidMessage'
                    type='text'
                    placeholder={`Leave a message for target.user`}
                    onChange={this.handleFormUpdate} />
                    <input name='newBidVal'
                    type='number'
                    placeholder='Bid in USD'
                    onChange={this.handleFormUpdate} />
                    <input name='newBidPrinter'
                    type='text'
                    placeholder='Printer to be used'
                    onChange={this.handleFormUpdate} />
                    <input name='newBidDaysEst'
                    type='number'
                    placeholder='Estimated days until ready to ship'
                    onChange={this.handleFormUpdate} />
                </form>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) =>{
    return {
        bid: reduxState.bid
    }
}

export default connect(mapStateToProps)(CreateBidForm) 