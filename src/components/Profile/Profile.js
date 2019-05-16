import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import SellerOrder from './SellerOrder'
import ClientOrder from './ClientOrder'

class Profile extends Component {
    constructor(props){
        super(props) 
        this.state = {
            sellerOrders: [],
            clientOrders: []
        }  
    }

    componentDidMount(){
        axios.get('/order/user-associated').then(res => {
            this.setState({sellerOrders: res.data.sellerOrders, clientOrders: res.data.clientOrders})
            console.log('get order success: ', res.data)
        }).catch(err => console.log('error getting users orders ', err))
    }

    handleShippedOrder = (shippedVals) => {
        const {newOrderVals, i} = shippedVals
        const newSellerOrders = [...this.state.sellerOrders]
        newSellerOrders[i] = {...newSellerOrders[i], ...newOrderVals}
        this.setState({sellerOrders: newSellerOrders})
    }

    render(){
        return(
            <div id='top-level-container'>
                <h1 id='top-level-title'>Profile</h1>
                {this.state.sellerOrders.map((ele, i) => {
                    return (
                        <SellerOrder key={i} {...ele} i={i} handleShippedOrder={this.handleShippedOrder} />
                    )
                })}
                {this.state.clientOrders.map((ele, i) => {
                    return (
                        <ClientOrder key={i} {...ele} />
                    )
                })}

            </div>
        )
    }
} 



export default Profile