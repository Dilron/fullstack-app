import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Redirect} from 'react-router'
import {activateBid, pushToBid} from '../../redDucks/bidReducer'

class Post extends Component{

    handleMakeBid = () => {
        console.log(this.props)
        if(this.props.userId && this.props.userId !== this.props.user_id){
            const {post_id, user_id, username, title, message, img_ref, request, bid_accepted, link_ref} = this.props
            this.props.pushToBid({post_id, user_id, username, title, message, img_ref, request, bid_accepted, link_ref})
            this.props.activateBid()
        }else{
            alert('You must be logged in')
        }
    }

    render(){
        return(
            <div className='post-container-oct'>
                <div className='post-container'>
                    <img src={this.props.img_ref}
                    className='post-preview-image'  />
                    <div className='post-body-container'>
                        <div className='post-info-container'>
                            <h1>{this.props.title}, from {this.props.username}</h1>
                            <h3 >{this.props.link_ref}</h3>
                            <h3>{this.props.message}</h3>
                        </div>
                        {!this.props.bid_accepted &&
                        <button onClick={() => this.handleMakeBid()} >Make Bid</button>}
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps ={
    activateBid,
    pushToBid
}

const mapStateToProps = (reduxState) => {
    return{
        userId: reduxState.user.userId
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Post)) 