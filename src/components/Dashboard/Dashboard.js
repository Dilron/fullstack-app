import React, {Component} from 'react'
import {connect} from 'react-redux'
import CreateRequestForm from './CreateRequestForm';
import CreateBidForm from './CreateBidForm';

class Dashboard extends Component {

    render(){
        return(
            <div id='top-level-container' className='dashboard'>
                <h1 >Dashboard</h1>
                <CreateRequestForm />
                <CreateBidForm />
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