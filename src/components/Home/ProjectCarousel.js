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
            console.log('log carousel get', res.data)
            this.setState({carousel: res.data, loadingCarousel: false})
        }).catch(err => console.log('error in carousel get: ', err))
    }
    render(){
        return(
                <Carousel className='carousel-container'
                stopOnHover={false} 
                autoPlay={false}
                interval={5000}
                infiniteLoop={true}
                showStatus={false}
                showThumbs={false} >
                    {this.state.loadingCarousel
                    ?
                    <div></div>
                    :
                    this.state.carousel.map((ele) => {
                        console.log(ele.title)
                        return(
                            <div className='carousel-slide' key={ele.order_id}>
                                <img className='carousel-img' src={ele.ship_img} />
                                <section className='carousel-text'>
                                    <h1><b><i>{ele.title}</i></b> <br/>
                                    printed by <b><i>{ele.username}</i></b> </h1>
                                    <h3>{ele.ship_message}</h3>
                                </section>
                            </div>
                        )
                    })
                     }
                </Carousel>
        )
    }
}

export default ProjectCarousel