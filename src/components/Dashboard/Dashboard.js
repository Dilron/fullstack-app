import React, {Component} from 'react'
import '../../StyleManager/output/Dashboard.css'
import axios from 'axios'
import {connect} from 'react-redux'

class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            newPostTitle : '',
            newPostMessage : '',
            newPostImg : '',
            newReqLink : '',
            newReqStreet : '',
            newReqCity : '',
            newReqState : '',
            newReqZIP : ''
        }
    }

    handleFormUpdate = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleNewReqSubmit = (e) => {
        e.preventDefault()
        let newReq = {...this.state}
         axios.post('/request/create-new', newReq).then(res => {
             return console.log('complete: ', res)
         }).catch(err => console.log('error in submit function: ', err))
        }
    

    render(){
        return(
            <div id='top-level-container' className='dashboard'>
                <h1 >Dashboard</h1>
                <form>
                    <h3>Create new post</h3>
                    <input name='newPostTitle'
                    type='text'
                    placeholder='Post title'
                    onChange={this.handleFormUpdate} />
                    <input name='newPostMessage'
                    type='text'
                    placeholder='Type message here'
                    onChange={this.handleFormUpdate} />
                    <input name='newPostImg'
                    type='text'
                    placeholder='Link to an image here'
                    onChange={this.handleFormUpdate} />
                    <input name='newReqLink'
                    type='text'
                    placeholder='Link to the file to be printed'
                    onChange={this.handleFormUpdate} />
                    <input name='newReqStreet'
                    type='text'
                    placeholder='Address'
                    onChange={this.handleFormUpdate} />
                    <input name='newReqCity'
                    type='text'
                    placeholder='City'
                    onChange={this.handleFormUpdate} />
                    <input name='newReqState'
                    type='text'
                    placeholder='State'
                    onChange={this.handleFormUpdate} />
                    <input name='newReqZIP'
                    type='text'
                    placeholder='ZIP'
                    onChange={this.handleFormUpdate} />
                    <button>Submit</button>
                </form>
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