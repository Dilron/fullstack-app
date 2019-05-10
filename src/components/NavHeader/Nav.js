import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {updateUserName, updateUserId, updateUserDetails, logoutUser} from '../../redDucks/userReducer'
import {showLogin, showProfileStub, showRegister} from '../../redDucks/navReducer'

class Nav extends Component {
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
            loadingNav: true
        }
    }

    async componentDidMount() {
        console.log('ping component did mount')
        const res = await axios.get('/auth/returning-user').catch(err => console.log('error checking return user: ', err))
            if(res.data){
                console.log('ping if true')
                console.log('check action call object creator data: ', res.data)
                this.props.updateUserName(res.data.username)
                const obj = {
                    firstname: res.data.firstname,
                    lastname: res.data.lastname,
                    profileRef: res.data.profile_ref
                }
                console.log('check action call details object: ', obj)
                this.props.updateUserDetails(obj)
                this.props.updateUserId(res.data.userId)
                this.props.showProfileStub()
                this.setState({loadingNav: false})
            }else{
                console.log('ping if false')
                this.props.showLogin()
                this.setState({loadingNav: false})
            }
    }

    handleFormUpdate = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLogout = () => {
        axios.get('/auth/logout').then(res => {
            console.log('Goodbye ', res.status)
        })
        this.props.showLogin()
        this.props.logoutUser()
    }

    handleLoginSubmit = async (e) => {
        e.preventDefault()
        this.setState({loadingNav: true})
        const {loginUsername, loginPassword} = this.state
        try{
            const res = await axios.post('/auth/login', {loginUsername, loginPassword})
            this.props.updateUserName(loginUsername)
            console.log(res.data)
            this.props.updateUserId(res.data.userId)
            const obj = {
                firstname: res.data.firstname,
                lastname: res.data.lastname,
                profileRef: res.data.profileRef
            }
            this.props.updateUserDetails(obj)
            this.props.showProfileStub()
            this.setState({loadingNav: false})
        }catch(err){
            this.setState({loadingNav: false})
            alert('Incorrect Login Info')
        }
    }

    handleRegisterSubmit = async (e) => {
        e.preventDefault()
        const {registerUsername, registerPassword, registerEmail, registerFirstname, registerLastname, registerProfileRef} = this.state;
        try{
            const res = await axios.post('/auth/register', {registerUsername, registerPassword, registerEmail, registerFirstname, registerLastname, registerProfileRef})
            this.props.updateUserName(registerUsername)
            this.props.updateUserId(res.data.userId)
            const obj = {
                firstname: this.state.registerFirstname,
                lastname: this.state.registerLastname,
                profileRef: this.state.registerProfileRef
            }
            this.props.updateUserDetails(obj)
            this.props.showProfileStub()
        }catch(err){
            alert('Problem registering info')
        }
    }
    
    render(){
        return(
                <div id='nav-container' className='nav-container'>
                    {this.state.loadingNav && (
                        <div>Loading</div>
                    ) }
                    {this.props.nav.showLogin && (
                            <form className='nav-form' onSubmit={this.handleLoginSubmit}>
                                <h1>Login:</h1>
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
                                <h1>Don't have an</h1>
                                <h1>account?</h1>
                                <button onClick={() => this.props.showRegister()}>Register</button>
                                <Link to='/'>
                                    <h1>Home</h1>
                                </Link>
                            </form>
                    )}
                    {this.props.nav.showRegister && (
                            <form className='nav-form' onSubmit={this.handleRegisterSubmit}>
                                <h1>Register:</h1>
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
                                <button onClick={() => this.props.showLogin()}>Cancel</button>
                                <Link to='/'>
                                    <h1>Home</h1>
                                </Link>
                            </form>
                    )}
                    {this.props.nav.showProfileStub && (
                        <div className='nav-stub'>
                            {this.props.user.profileRef && (
                                <img src={this.props.user.profileRef} className='profile-stub-img' alt='profile' />
                            )}
                            <h1>
                                Username: {this.props.user.username} 
                            </h1>
                            <Link to='/'>
                                <h1>Home</h1>
                            </Link>
                            <Link to='/profile'>
                                <h1>Profile</h1>
                            </Link>
                            <Link to='/dashboard'>
                                <h1>Orders Dashboard</h1>
                            </Link>
                            <Link to='/'>
                                <h1 onClick={() => this.handleLogout()}>Logout</h1> 
                            </Link>
                        </div>
                    )}
                </div>
       )
    }
} 

const mapStateToProps = (reduxState) => {
    return {
        user: reduxState.user,
        nav: reduxState.nav
    }
}

const mapDispatchToProps = {
    updateUserName,
    updateUserId,
    updateUserDetails,
    logoutUser,
    showLogin,
    showProfileStub,
    showRegister
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)