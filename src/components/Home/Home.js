import React, {Component} from 'react'
import axios from 'axios'
import Post from './Post'
import {connect} from 'react-redux'
import CreateBidForm from '../Dashboard/CreateBidForm';
import ProjectCarousel from './ProjectCarousel'

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            postsDisplay: [],
            offset: 0,
            postsLoading: true,
            carousel: [],
            loadingCarousel: true
        }
    }

    componentDidMount(){
        axios.get(`/post/read-5/${this.state.offset}`).then(res => {
            this.setState({postsDisplay: res.data, postsLoading: false})
        }).catch(err => console.log('error getting posts: ', err))
        axios.get('/order/carousel').then(res => {
            this.setState({carousel: res.data, loadingCarousel: false})
        }).catch(err => console.log('error in carousel get: ', err))
    }

    render(){
        return(
            <div id='background'>
                <div id='top-level-container' className='home-container'>
                    <h1 id='top-level-title'>Home</h1>
                    <span>Recently Completed Projects</span>
                    {this.state.loadingCarousel
                    ?
                    <div></div>
                    :
                    <ProjectCarousel carousel={this.state.carousel} />
                    }
                    {this.props.activeBid && <CreateBidForm /> }
                    <span>Recent Bids</span>
                    <div className='posts-display'>
                    {this.state.postsLoading && <h1>Loading</h1>}
                    {!this.state.postsLoading && this.state.postsDisplay.map((ele, i) => {
                        return (<Post key={i+1} {...ele} />)
                    })}

                    </div>
                </div>
            </div>
        )
    }
} 

const mapStateToProps = (reduxState) => {
    return {
        activeBid: reduxState.bid.activeBid
    }
}

export default connect(mapStateToProps)(Home) 