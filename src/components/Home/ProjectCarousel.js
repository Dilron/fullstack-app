import React, {Component} from 'react';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios'

class ProjectCarousel extends Component {
    constructor(props){
        super(props)
        this.state = {
            carousel: [],
            loadingCarousel: true
        }
    }

    componentDidMount(){
        axios.get('/order/carousel').then(res => {
            this.setState({carousel: res.data, loadingCarousel: false})
        })
    }
    render(){
        return(
            <div className='mark-div'>
                {this.state.loadingCarousel ?
                <div></div>
                :
                <Carousel autoPlay={true} 
                stopOnHover={false} 
                autoPlay={5000}
                infiniteLoop={true}
                showStatus={false}
                showThumbs={false} >
                    {this.state.carousel.map((ele, i) => {
                        return(
                            <div className='carousel-slide' key={ele.order_id}>
                                <img className='carousel-img' src={ele.ship_img} />
                                <p>{i}</p>
                            </div>
                        )
                    })}
                </Carousel>
                }
            </div>
        )
    }
}

export default ProjectCarousel