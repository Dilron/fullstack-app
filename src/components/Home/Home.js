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

    handlePostsPage = (num) => {
        const newOffset = this.state.offset + num
        axios.get(`/post/read-5/${newOffset}`).then(res => {
            this.setState({postsDisplay: res.data, postsLoading: false, offset: newOffset})
        }).catch(err => console.log('error getting posts: ', err))
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
        const {offset} = this.state
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
                    <span>Recent Project Request</span>
                    <div className='posts-display'>
                    <div className='page-buttons'>
                        {offset ? 
                            (<button onClick={() => this.handlePostsPage(-6)}>Previous</button> ) 
                            : (<button disabled>Previous</button>)  }
                        <button onClick={() => this.handlePostsPage(6)}>Next</button>
                    </div>
                        {this.state.postsLoading && <h1>Loading</h1>}
                        {!this.state.postsLoading && this.state.postsDisplay.map((ele, i) => {
                            return (<Post key={i+1} {...ele} />)
                        })}
                    <div className='page-buttons'>
                        {offset ? 
                            (<button onClick={() => this.handlePostsPage(-6)}>Previous</button> ) 
                            : (<button disabled>Previous</button>)  }
                        <button onClick={() => this.handlePostsPage(6)}>Next</button>
                    </div>
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