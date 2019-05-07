import React, {Component} from 'react'
import '../../StyleManager/output/Profile.css'
import axios from 'axios'
import {connect} from 'react-redux'

class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            newPostTitle : '',
            newPostMessage : '',
            newPostImg : '',
            newReqLink : '',
            newReqAddress : '',
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

    handleNewReqSubmit = async (e) => {
        e.preventDefault()
        let newReq = {...this.state, userId: this.props.userId}
        try{
            const res = await axios.post('/request/new', newReq)
        }catch(err){
            return alert('Could not submit')
        }
    }

    render(){
        return(
            <div id='top-level-container'>
                <h1 >Profile</h1>
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
                    placeholder='Link'
                    onChange={this.handleFormUpdate} />
                    <input name='newReqAddress'
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

mapStateToProps = (reduxState) => {
    return {
        userId: reduxState.user.userId
    }
}


export default connect(mapStateToProps)(Profile)