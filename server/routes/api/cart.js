const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const CartService = require('../../services/cartService')
const CartSvc = new CartService();
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

router.post('/add', async (req, res) => {

    // deconstructing user data via refreshToken
    const refreshToken = req.cookies.refreshToken
    console.log("checking refresh token at cart.js route", refreshToken)
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    console.log(decoded);

    const userId = decoded.id;

    console.log("user id is", userId)

    // make data an array
    const data = [req.body]
    const object = data[0]

    try {

        for (let [key, value] of Object.entries(object)) {
            CartSvc.createNewCartItem(key, userId, value.amount)
        }

        res.send("successfully added")

    } catch (error) {
        console.error(error)
    }
})

router.delete('/delete/:id', async (req, res) => {

    // deconstructing user data via refreshToken
    // need a verification/ security check route
    const refreshToken = req.cookies.refreshToken
    console.log("checking refresh token at cart.js route", refreshToken)
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    console.log(decoded);

    const userId = decoded.id;

    console.log("user id is", userId)
    const listingId = req.params.id

    const deleteItem = await CartSvc.deleteCartItem(userId, listingId)
    console.log("response from deletion", deleteItem)
 

    try {

        

    } catch (error) {
        console.error(error)
    }
})

router.get('/get', async (req, res) => {

    // deconstructing user data via refreshToken
    const refreshToken = req.cookies.refreshToken
    console.log("checking refresh token at cart.js route", refreshToken)
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    console.log(decoded);

    const userId = decoded.id;

    console.log("user id is", userId)

    try {
        const data = await CartSvc.getAllCartItemsByUser(userId)
        console.log("fetched cart items", data)
        res.send(data)

    } catch (error) {
        console.error(error)
    }

})

router.get('/checkout', async (req, res) => {

    // deconstructing user data via refreshToken
    const refreshToken = req.cookies.refreshToken
    console.log("checking refresh token at cart.js route", refreshToken)
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    console.log(decoded);

    const userId = decoded.id;

    console.log("user id is", userId)

    const items = await CartSvc.getAllCartItemsByUser(userId)

    // console.log(items)

    // res.send(items)

    const lineItems = []
    const meta = []

    try {

        for (let i of items) {
            // stripe keys
            let singleLineItem = {
                quantity: i.quantity,
                price_data: {
                    'currency': 'SGD',
                    'unit_amount': i.price,
                    'product_data': {
                        'name': i.listingDetails.propertyDetails.street_name,
                        'images': [i.listingDetails.media[0].media_url]
                    }

                }
            }
            lineItems.push(singleLineItem)
            meta.push({
                'product_id': i.listingDetails.id,
                'quantity': i.quantity,

            })
        }
        console.log("line items", lineItems)
        // res.send(lineItems)

        const metaDataString = JSON.stringify(meta);
        const payment = {
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: lineItems,
            success_url: "http://localhost:3001/dashboard",
            cancel_url: process.env.LOCAL_SERVER + "cart/checkout/error",
            metadata: {
                'orders': metaDataString
            }
        }
        const stripeSession = await Stripe.checkout.sessions.create(payment);

        res.send(stripeSession.id)

    } catch (error) {
        console.error(error)
    }
})

router.get('/checkout/success', (req, res) => {
    res.send("payment successful")
})

router.get('/checkout/error', (req, res) => {
    res.send("payment failed, please try again")
})

router.post('/processed', express.raw({
    type: 'application/json'
}), function (req, res) {

    // 1. verify that this is called by stripe

    const payload = req.body
    const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET
    const sigHeader = req.headers['stripe-signature']


    // 2. check the event and whether there is "checkout.session.completed "
    try {

        let event = Stripe.webhooks.constructEvent([payload, sigHeader, endpointSecret]);
        console.log("event from strip",event)
        // if (event.type === 'checkout.session.completed') {
        //     const stripeSession = event.date.object;
        //     console.log(stripeSession);
        //     // 3. if so, need to store transaction info


        //     res.send({ 'received': true })
        // }

    } catch (error) {
        console.error(error)
        res.status(500);
        res.send({
            'error': error
        })
    }



})



module.exports = router