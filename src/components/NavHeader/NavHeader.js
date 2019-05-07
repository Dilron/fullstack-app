import React, {Component} from 'react'
import '../../StyleManager/output/NavHeader.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {updateUserName, updateUserId} from '../../redDucks/userReducer'

class NavHeader extends Component {
    constructor(props){
        super(props)
        this.state = {
            loginUsername: '',
            loginPassword: '',
            registerUsername: '',
            registerPassword: '',
            registerEmail: '',
            registerFirstname: '',
            registerLastname: '',
            registerProfileRef: '',
        }
    }

    handleFormUpdate = async (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLoginSubmit = async (e) => {
        e.preventDefault()
        const {loginUsername, loginPassword} = this.state
        try{
            const res = await axios.post('/auth/login', {loginUsername, loginPassword})
            this.props.updateUserName(loginUsername)
            this.props.updateUserId(res.data.uesrId)
        }catch(err){
            alert('Incorrect Login Info')
        }
    }

    handleRegisterSubmit = async (e) => {
        e.preventDefault()
        const {registerUsername, registerPassword, registerEmail, registerFirstname, registerLastname, registerProfileRef} = this.state;
        try{
            const res = await axios.post('/auth/register', {registerUsername, registerPassword, registerEmail, registerFirstname, registerLastname, registerProfileRef})
            this.props.updateUserName(registerUsername)
        }catch(err){
            alert('Problem registering info')
        }
    }
    
    render(){
        return(
            <div className='nav-header-container'>
                <div className='header-container'>header</div>
                <div className='nav-container'>
                    <div className='nav-login'>
                        <form onSubmit={this.handleLoginSubmit}>
                            <input 
                            type='text' 
                            name='loginUsername'
                            placeholder='Username'
                            onChange={this.handleFormUpdate} />
                            <input
                            type='text'
                            name='loginPassword'
                            placeholder='Password'
                            onChange={this.handleFormUpdate} />
                            <button>Login</button>
                        </form>
                    </div>
                    <div className='nav-register'>
                        <form>
                            <input
                            type='text'
                            name='registerUsername'
                            placeholder='Choose username'
                            onChange={this.handleFormUpdate} />
                            <input
                            type='text'
                            name='registerPassword'
                            placeholder='Choose password'
                            onChange={this.handleFormUpdate} />
                            <input
                            type='text'
                            name='registerEmail'
                            placeholder='Enter email'
                            onChange={this.handleFormUpdate} />
                            <input
                            type='text'
                            name='registerFirstname'
                            placeholder='Your first name'
                            onChange={this.handleFormUpdate} />
                            <input
                            type='text'
                            name='registerLastname'
                            placeholder='Your last name'
                            onChange={this.handleFormUpdate} />
                            <input
                            type='text'
                            name='registerProfileRef'
                            placeholder='Profile image link'
                            onChange={this.handleFormUpdate} />
                            <button>Register</button>
                        </form>
                    </div>
                    <div>Username: {this.props.username} </div>
                </div>
            </div>
       )
    }
} 

const mapStateToProps = (reduxState) => {
    return {
        username: reduxState.user.username
    }
}

const mapDispatchToProps = {
    updateUserName,
    updateUserId
}

export default connect(mapStateToProps, mapDispatchToProps)(NavHeader) 