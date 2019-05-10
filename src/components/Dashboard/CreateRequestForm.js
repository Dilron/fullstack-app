import React, {Component} from 'react'
import axios from 'axios'

class CreateRequestForm extends Component {
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
            console.log('complete: ', res.status)
         }).catch(err => console.log('error in submit function: ', err))
         return document.getElementById('dash-new-req-form').reset()
        }

        render(){
            return(
                <form id='dash-new-req-form' onSubmit={this.handleNewReqSubmit}>
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
            )
        }
    }

    export default CreateRequestForm