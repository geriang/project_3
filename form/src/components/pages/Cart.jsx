import React, { useCallback, useContext, useEffect, useState } from 'react';
import AuthContext from '../authcontext/AuthContext';
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios';


export default function Cart() {

    const authData = useContext(AuthContext);

    const [cartItems, setCartItems] = useState([])

    const deleteItem = useCallback(async (id) => {
        console.log(id)
        const response = await axios.delete (`http://localhost:3000/cart/delete/${id}`, { withCredentials: true })
        console.log(response.data)
        // if(response.data){

        //     const stripe = await loadStripe('pk_test_51MyCtHBtiThgr32facws8YyTI6103Ta080fqAtTTnKLutsH6YeMwI4kyop2wUj8FOGovASFXhXe6XUZpyqlSdJoY00gh0OejGW')
        //     stripe.redirectToCheckout({ sessionId: response.data });
        // }


    }, [])

    const checkout = useCallback(async () => {
        const response = await axios.get("http://localhost:3000/cart/checkout", { withCredentials: true })
        console.log(response.data)
        if (response.data) {
            const stripe = await loadStripe('pk_test_51MyCtHBtiThgr32facws8YyTI6103Ta080fqAtTTnKLutsH6YeMwI4kyop2wUj8FOGovASFXhXe6XUZpyqlSdJoY00gh0OejGW')
            stripe.redirectToCheckout({ sessionId: response.data });
        }


    }, [])


    useEffect(() => {

        const getCartItems = async () => {

            const response = await axios.get("http://localhost:3000/cart/get", { withCredentials: true })

            console.log(response.data)
            // const data = response.data
            setCartItems(response.data)

        }

        getCartItems()

    }, [])

    return (
        <>
            <div className="container-fluid p-1" style={{ width: "90%" }}>
                <h1>Cart</h1>
                <h4>Hi {authData.getUserDetail().username ? authData.getUserDetail().username : null}, here are your cart items</h4>

                <div className="row row-cols-1 g-4">
                    {cartItems.map((obj) => {
                        return (
                            <div className="col" key={obj.id}>
                                <div className="card mb-3" style={{ maxWidth: "1000px" }}>
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            <img src={obj.listingDetails.media[0].media_url} className="img-fluid rounded-start" alt="..." />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{obj.listingDetails.propertyDetails.street_name}</h5>
                                                <p className="card-text">Quantity: {obj.quantity}</p>
                                                <p className="card-text">Price: {obj.price}</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                                                <button className='btn btn-danger btn-sm' onClick={() => { deleteItem(obj.listing_detail_id) }}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        )
                    })}

                </div>
                <div className='d-flex justify-content-center'>
                    <button className='btn btn-danger' onClick={checkout}>Checkout</button>

                </div>
            </div>
        </>
    )
}