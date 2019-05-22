import React, {Component} from 'react';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


class ProjectCarousel extends Component {
    
    render(){
        return(
                <Carousel className='carousel-container'
                stopOnHover={false} 
                autoPlay={true}
                interval={5000}
                infiniteLoop={true}
                showStatus={false}
                showThumbs={false} >
                    {
                    this.props.carousel.map((ele) => {
                        return(
                            <div className='carousel-slide' key={ele.order_id}>
                                <img className='carousel-img' src={ele.ship_img} alt='completed project' />
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