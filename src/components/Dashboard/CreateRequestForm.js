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
            newReqZIP : '',
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
                <div className='dash-new-req-form-oct'>
                    <div className='dash-new-req-form-container'>
                        <form id='dash-new-req-form' className='dash-new-req-form' onSubmit={this.handleNewReqSubmit}>
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
                            <div className='req-form-state-zip'>
                                <input name='newReqState'
                                type='text'
                                placeholder='State'
                                onChange={this.handleFormUpdate} />
                                <input name='newReqZIP'
                                type='text'
                                placeholder='ZIP'
                                onChange={this.handleFormUpdate} />
                            </div>
                            <button>Submit</button>
                        </form>
                        {this.state.newPostImg !== '' &&
                        <img className='dash-new-req-form-image-preview' src={this.state.newPostImg} alt='preview'/>
                        }
                    </div>
                </div>
            )
        }
    }

    export default CreateRequestForm