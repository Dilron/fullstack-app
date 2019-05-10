import React, {Component} from 'react'
import Nav from './Nav'

class NavHeader extends Component {
    constructor(props){
        super(props)
    }

    mobileToggleNav = () => {
        const nav = document.getElementsByClassName('nav-container')
        if(nav[0].id === 'nav-container'){
            nav[0].id = 'nav-container-mobile'
        } else {
            nav[0].id = 'nav-container'
        }
    }
    
    render(){
        return(
            <div className='nav-header-container'>
                <div className='header-container'>
                    <img className='nav-burger'
                    onClick={() => this.mobileToggleNav()} 
                    src='https://i.imgur.com/Lnn7ows.png' 
                    alt='show menu button' />
                    <h1>
                        header
                    </h1>
                </div>
                <Nav/>
            </div>
       )
    }
} 

export default NavHeader 