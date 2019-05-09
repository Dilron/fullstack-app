import React, {Component} from 'react'
import '../../StyleManager/output/Post.css'

class Post extends Component{
    render(){
        return(
            <div className='post-container'>
                <h1>Image standin: <br/> {this.props.img_ref} </h1>
                <div className='post-body-container'>
                    <div className='post-info-container'>
                        <h1>{this.props.title}</h1>
                        <h3>{this.props.user_id} </h3>
                        <h3>{this.props.link_ref}</h3>
                    </div>
                    <h3>{this.props.message}</h3>
                    {!this.props.bid_accepted && 
                    <button>Make Bid</button>}
                </div>
            </div>
        )
    }
}

export default Post