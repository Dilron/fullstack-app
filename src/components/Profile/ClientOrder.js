import React, {Component} from 'react'

class ClientOrder extends Component {


    render(){
        const {img_ref, ship_img, title, username, message,
            bid_message, link_ref, printer, est_processing_time, 
            state, street, city, zip, shipped, ship_message,
            } = this.props
        return(
            <div className='order-oct'>
                <div className='order-container'>
                    <div className='order-image-container'>
                        <img className='order-image'
                        src={img_ref}
                        alt='preview' />
                        <img className='order-image'
                        src={ship_img}
                        alt='finished product' />
                    </div>
                    <div className='order-body-container'>
                        <h1>Order: <u>{title}</u> for user: <u>{username}</u> </h1>
                        <section>
                            <h2><i>{message}</i></h2>
                            <h2><i>{bid_message}</i></h2>
                        </section>
                        <h1><u>{link_ref}</u></h1>
                        <section>
                            <h2>
                                Printed on: <br/>
                                <u>{printer}</u> <br/>
                                Estimated build time: <br/>
                                <u>{est_processing_time}</u> days
                            </h2>
                            <h2>Shipping to address:<br/>
                                <u>{street}</u><br/>
                                <u>{city}</u><br/>
                                <u>{state}</u>, <u>{zip}</u>
                            </h2>
                        </section>
                        <h1>Status: {shipped ? 'Completed and Shipped' : 'Processing' } </h1>
                        <section>
                            <h2><i>{ship_message}</i> </h2>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}

export default ClientOrder