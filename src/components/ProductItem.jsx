import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'

class ProductItem extends Component {

    onAddClick = () => {
        let {barang} = this.props

        let userId = this.props.user_id
        let productId = barang.id
        let productName = barang.name
        let productPrice = parseInt(barang.price)
        let productDesc = barang.description
        let productPict = barang.picture
        let qty = parseInt(this.qty.value)

        // Cek apakah user sudah pernah add to cart barang yang sama
        axios.get(
            'http://localhost:2019/carts',
            {
                params: {
                    userId: this.props.user_id,
                    productId: barang.id
                }
            }
        ).then((res) => {
            // Check apakah data ditemukan
            if(res.data.length === 0){
                // post cart baru
                axios.post(
                    'http://localhost:2019/carts',
                    {
                        userId: userId,
                        productId: productId,
                        productName: productName,
                        productPrice: productPrice,
                        productDesc: productDesc,
                        productPict: productPict,
                        productQty: qty
                    }
                )

            } else {
                // edit qty
                // res.data[0] = {id, productId, productName, ..., qty} / cart
                // this.qty.value = data dari textboxt
                let newQty = res.data[0].productQty + parseInt(this.qty.value)

                axios.patch(
                    `http://localhost:2019/carts/${res.data[0].id}`,
                    {
                        productQty: newQty
                    }
                )
            }
        })
    }

    render() {
        let {id, name, price, picture} = this.props.barang

        return (
            <div className='card col-5 mx-4 my-3' >
                <img src={picture} className='card-img-top'/>
                <div className='card-body'>
                    <h5 className='card-title'>{name}</h5>
                    <p className='card-text'>{price}</p>
                    <input ref={input => this.qty = input} className='form-control mb-2' type="number" />
                    <Link to={`/productdetail/${id}`}>
                        <button className='btn btn-block btn-outline-primary'>Detail</button>
                    </Link>
                    <button onClick={this.onAddClick} className='btn btn-block btn-outline-primary'>Add To Cart</button>
                </div>
            </div>
        )
    }
}

const mstp = state => {
    return {
        user_id: state.auth.id
    }
}

export default connect(mstp)(ProductItem)