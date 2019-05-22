import React, {Component} from 'react'
import Nav from './Nav'

class NavHeader extends Component {
    

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
                    <img className='pr-logo'
                    src='https://i.imgur.com/dILYMwf.png'
                    alt='print radicals logo' />
                     <section>
                        <h1>
                            Print-radicals
                        </h1>
                        <h3>Crowd Sourced 3D Printing</h3>
                     </section>
                </div>
                <Nav mobileToggleNav={this.mobileToggleNav}/>
            </div>
       )
    }
} 

export default NavHeader 