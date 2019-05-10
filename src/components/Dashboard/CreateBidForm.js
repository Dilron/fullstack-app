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
            <div>
                <h1>Create New Bid:</h1>
                {/* <Re-Render Post Here/> */}
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