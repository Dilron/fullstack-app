import React, {Component} from 'react'

class ClientOrder extends Component {


    render(){
        const {img_ref, ship_img, title, username, message,
            bid_message, link_ref, printer, est_processing_time, 
            state, street, city, zip, shipped, ship_message,
            bid_val} = this.props
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
                        <h1>Order: <b><i>{title}</i></b> for user: <b><i>{username}</i></b> </h1>
                        <section>
                            <h2><i>{message}</i></h2>
                            <h2><i>{bid_message}</i></h2>
                        </section>
                        <h1><u>{link_ref}</u></h1>
                        <section>
                            <h2>
                                Printed on: <br/>
                                <b><i>{printer}</i></b> <br/>
                                Estimated build time: <br/>
                                <b><i>{est_processing_time}</i></b> days
                            </h2>
                            <h2>Shipping to address:<br/>
                                <b><i>{street}</i></b><br/>
                                <b><i>{city}</i></b><br/>
                                <b><i>{state}</i></b>, <b><i>{zip}</i></b>
                            </h2>
                        </section>
                        <h1>Status: <b><i>{shipped ? 'Completed and Shipped' : 'Processing' }</i></b> Paid: <b><i>{bid_val}</i></b> </h1>
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