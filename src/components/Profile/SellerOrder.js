import React, {Component} from 'react'
import axios from 'axios'

class SellerOrder extends Component {
    constructor(props){
        super(props)
        this.state = {
            shipFormImg: '',
            shipFormMessage: '',
            shipFormPost: true
        }
    }

    handleFormUpdate = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCheckbox = (e) => {
        console.log('fire checkbox')
        this.setState({
            [e.target.name]: !this.state.shipFormPost
        })
    }

    handleShipFormSubmit = (e) => {
        e.preventDefault()
        // console.log(this.state.shipFormPost)
        const {shipFormImg, shipFormMessage, shipFormPost} = this.state
        const {order_id : orderId, i} = this.props
        axios.put('/order/ship', {shipFormImg, shipFormMessage, shipFormPost, orderId})
        .then(res => {
            const shippedVals = {newOrderVals: {...res.data}, i}
            this.props.handleShippedOrder(shippedVals)
        }).catch(err => console.log('error submittin ship form ', err))
    }

    render(){
        const {img_ref, ship_img, title, username, message,
             bid_message, link_ref, printer, est_processing_time, 
             state, street, city, zip, shipped, ship_message, bid_val} = this.props
        return(
            <div className='order-oct'>
                <div className='order-container'>
                    <div className='order-image-container'>
                        <img className='order-image'
                        src={img_ref}
                        alt='preview' />
                        {shipped 
                        ?
                        (
                            <img className='order-image'
                            src={ship_img}
                            alt='finished product' />
                        )
                        :
                        (
                            <img className='order-image'
                            src={this.state.shipFormImg}
                            alt='finished product' />
                        ) }
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
                        {shipped 
                        ?
                        (<section>
                            <h2><i>{ship_message}</i> </h2>
                        </section>)
                        :
                        (
                        <form onSubmit={this.handleShipFormSubmit}>
                            <input name='shipFormImg'
                            placeholder='Link to an image of the finished product'
                            type='text'
                            className='ship-form-input'
                            onChange={this.handleFormUpdate} />
                            <input name='shipFormMessage'
                            placeholder='Type a message to show with the image'
                            type='text'
                            className='ship-form-input'
                            onChange={this.handleFormUpdate} />
                            <div>
                                <input type='checkbox'
                                name='shipFormPost'
                                checked
                                onInput={this.handleCheckbox} />
                                <label htmlFor='shipFormPost'>Publish post</label>
                            </div>
                            <button>Mark order as Shipped</button>
                        </form>
                        ) }
                    </div>
                </div>
            </div>
        )
    }
}

export default SellerOrder;