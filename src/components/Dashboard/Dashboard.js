import React, {Component} from 'react'
import {connect} from 'react-redux'
import CreateRequestForm from './CreateRequestForm';
import RequestManager from './RequestManager'
import ReviewPayment from './ReviewPayment'

class Dashboard extends Component {

    render(){
        return(
            <div id='top-level-container' className='dashboard'>
                <h1 id='top-level-title' >Dashboard</h1>
                <CreateRequestForm />
                <RequestManager />
                <ReviewPayment />
            </div>
        )
    }
} 

const mapStateToProps = (reduxState) => {
    return {
        userId: reduxState.user.userId
    }
}

export default connect(mapStateToProps)(Dashboard)