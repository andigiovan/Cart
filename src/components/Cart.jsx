import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

import Checkout from './Checkout'

class Cart extends Component {

    state = {
        carts: [],
        checkout: null
    }


    componentDidMount() {
        // get data
        this.getData()
    }

    onCheckoutClick = () => {
        this.setState((state) => {
            return {
                checkout: state.carts
            }
        })
    }

    getData = () => {
        axios.get(
            'http://localhost:2019/carts',
            {
                params: {
                    userId: this.props.user_id
                }
            }
        ).then(res => {
            this.setState({carts: res.data})
        })
    }
    
    renderList = () => {
        //  render list
        return this.state.carts.map((cart) => {
           return (
            <tr>
                <td>{cart.id}</td>
                <td>{cart.productName}</td>
                <td>{cart.productDesc}</td>
                <td>{cart.productPrice}</td>
                <td>{cart.productQty}</td>
                <td>
                    <img className='list' src={cart.productPict} alt=""/>
                </td>
                <td>
                    <button className='btn btn-outline-danger'>Delete</button>
                </td>
            </tr>
           )
        })
    }

    render() {
        return (
            <div>
                <h1 className='display-4 text-center'>List Product</h1>
                <table className='table text-center'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>DESC</th>
                            <th>PRICE</th>
                            <th>QTY</th>
                            <th>PICTURE</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </table>

                <div className='text-center'>
                    <button onClick={this.onCheckoutClick} className='btn btn-primary'>Checkout</button>
                </div>

                <Checkout carts={this.state.checkout} /> 
                
            </div>
        )
    }
}

const mstp = state => {
    return {
       user_id : state.auth.id
    }
}

export default connect(mstp)(Cart)