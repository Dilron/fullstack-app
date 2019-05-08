import React, {Component} from 'react'
import '../../StyleManager/output/Profile.css'
import {connect} from 'react-redux'

class Profile extends Component {
    constructor(props){
        super(props)   
    }

    render(){
        return(
            <div id='top-level-container'>
                <h1 >Profile</h1>
            </div>
        )
    }
} 



export default Profile