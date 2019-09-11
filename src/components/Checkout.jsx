import React, { Component } from 'react'

class Checkout extends Component {

    renderCheckoutBody = () => {
        return this.props.carts.map((cart) => {
            return (
                <tr>
                    <td>{cart.id}</td>
                    <td>{cart.productName}</td>
                    <td>{cart.productQty}</td>
                    <td>{cart.productPrice}</td>
                    <td>{cart.productQty * cart.productPrice}</td>
                </tr>
            )
        })
    }

    renderCheckoutFoot = () => {
        let total = 0

        this.props.carts.forEach((cart) => {
            total += (cart.productQty * cart.productPrice)
        })

        return (
            <tr>
                <th colSpan='4'>TOTAL</th>
                <td>{total.toLocaleString('IN')}</td>
            </tr>
        )
    }

    render() {
        // bukan null
        if(this.props.carts){
            return (
                <div>
                    <h1 className='display-4 text-center'>Checkout</h1>
                    <table className='table text-center'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>QTY</th>
                                <th>PRICE</th>
                                <th>TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderCheckoutBody()}
                            {this.renderCheckoutFoot()}
                        </tbody>
                        
                    </table>
                </div>
            )
        } else {
            // Tidak akan menampilkan apapun
            return null
        }
    }
}

export default Checkout