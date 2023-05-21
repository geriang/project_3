import React, { useCallback, useEffect, useState } from 'react';
import { NumericFormat } from "react-number-format";
import bedIcon from "../../assets/bedIcon.png"
import bathIcon from "../../assets/bathIcon.png"
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';

export default function PropertyListing() {

    const [data, setData] = useState([]);
    // const [cartItems, setCartItems] = useState([]);
    const [itemQuantity, setItemQuantity] = useState({});

    const searchPropertyName = useCallback(async (e) => {
        console.log(e.target.value)
        const response = await axios.get('http://localhost:3000/property/get', {
            params: {
                name: e.target.value
            }
        })
        const propertyListingData = response.data
        console.log(response.data)
        setData(() => propertyListingData)
    }, [])

    const searchListingType = useCallback(async (e) => {
        console.log(e.target.value)
        const response = await axios.get('http://localhost:3000/property/get', {
            params: {
                listing: e.target.value
            }
        })
        const propertyListingData = response.data
        console.log(response.data)
        setData(() => propertyListingData)
    }, [])

    const searchPropertyType = useCallback(async (e) => {
        console.log(e.target.value)
        const response = await axios.get('http://localhost:3000/property/get', {
            params: {
                type: e.target.value
            }
        })
        const propertyListingData = response.data
        console.log(response.data)
        setData(() => propertyListingData)
    }, [])


    const setQuantity = useCallback((id, price, e) => {
        
        let clone = itemQuantity
        let modifiedClone = {...clone, [id] : {"quantity": e.target.value, "amount": price}}
        setItemQuantity(()=> (modifiedClone))

    }, [itemQuantity])

    const addToCart = useCallback(() => {

        const response = axios.post("http://localhost:3000/cart/add", itemQuantity, { withCredentials: true } )
        console.log(response.data)

        // const id = e.target.getAttribute('data')
        // const amount = e.target.getAttribute('amount')
  
        // console.log(id,amount)
        // const response = await axios.get('http://localhost:3000/property/get', {
        //     params: {
        //         type: e.target.value
        //     }
        // })
        // const propertyListingData = response.data
        // console.log(response.data)
        // setData(() => propertyListingData)
    }, [itemQuantity])



    useEffect(() => {

        const getPropertyData = async () => {
            const response = await axios.get('http://localhost:3000/property/get')
            const propertyListingData = response.data
            console.log(response.data)
            setData(() => propertyListingData)
        }

        // const getAgentData = async () => {


        // }

        getPropertyData()

    }, [])

    return (
        <>
            <div className="container-fluid p-1" style={{ width: "90%" }}>
                {/*Search Bar Start  */}
                <div className="d-flex justify-content-center">
                    <Navbar bg="light" variant="light">
                        <Container>
                            <Nav className="me-auto flex-column flex-md-row">
                                <div className="d-flex justify-content-center mb-3 mb-md-0">
                                    <Form className="d-flex">
                                        <Form.Control
                                            placeholder="Search"
                                            style={{ width: "350px" }}
                                            className="me-2"
                                            aria-label="Search"
                                            type="text"
                                            onChange={searchPropertyName}
                                        />
                                    </Form>
                                </div>
                                <div className="d-flex justify-content-center mb-3 mb-md-0 pe-2">
                                    <Form.Select aria-label="Default select example" onChange={searchListingType}>
                                        <option >Sale/Rent</option>
                                        <option value="For Sale">For Sale</option>
                                        <option value="For Rent">For Rent</option>
                                    </Form.Select>
                                </div>
                                <div className="d-flex justify-content-center pe-2">
                                    <Form.Select aria-label="Default select example" onChange={searchPropertyType}>
                                        <option >Property Type</option>
                                        <option value="HDB">HDB</option>
                                        <option value="Condo">Condo</option>
                                        <option value="Landed">Landed</option>
                                        <option value="Retail">Retail</option>
                                        <option value="Office">Office</option>
                                        <option value="Industrial">Industrial</option>
                                    </Form.Select>
                                </div>
                            </Nav>
                        </Container>
                    </Navbar>

                </div>

                {/* Search Bar End */}
                <h5 className="m-3">{data.length} Property Listings Available</h5>

                <div className='container'>

                    <div className="row row-cols-1 row-cols-md-3 g-4">

                        {data.map((obj) => {
                            return (
                                <div className="col" key={obj.id}>
                                    <div className="card border-light h-100">
                                        <img src={obj.media[0].media_url} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            {obj.propertyDetails.project_name ? <h5 className="card-title">{obj.propertyDetails.project_name}</h5> :
                                                <h5 className="card-title">{obj.propertyDetails.street_name}</h5>}

                                            <p className="card-text" style={{ margin: "0", lineHeight: "1.5" }}>{obj.size_land ? null : obj.propertyDetails.block} {obj.propertyDetails.street_name}</p>
                                            <p className="card-text" style={{ fontSize: "14px", margin: "0", lineHeight: "1.5" }}>
                                                <NumericFormat className="card-text" prefix={"$"} suffix={""} thousandSeparator={true} value={obj.price} displayType={"text"} />
                                                {" . "}<NumericFormat className="card-text" prefix={"$"} suffix={"psf (floor)"} thousandSeparator={true} value={Math.round(obj.price / obj.size_built)} displayType={"text"} />
                                                {obj.size_land ? <NumericFormat className="card-text" prefix={" . $"} suffix={"psf (land)"} thousandSeparator={true} value={Math.round(obj.price / obj.size_land)} displayType={"text"} /> : null}
                                            </p>
                                            <p className="card-text" style={{ fontSize: "14px", margin: "0", lineHeight: "1.5" }}>
                                                {obj.room}{" "}<img src={bedIcon} style={{ width: "20px" }} />
                                                {" " + obj.bath + " "}<img src={bathIcon} style={{ width: "20px" }} />
                                                {" . "}<NumericFormat className="card-text" prefix={""} suffix={"sqft (floor)"} thousandSeparator={true} value={obj.size_built} displayType={"text"} />
                                                {obj.size_land ? <NumericFormat className="card-text" prefix={" . "} suffix={"sqft (land)"} thousandSeparator={true} value={obj.size_land} displayType={"text"} /> : null}
                                            </p>
                                            <p className="card-text" style={{ fontSize: "14px", margin: "0", lineHeight: "3" }}>
                                                <span className="btn btn-outline-danger disabled" style={{ fontSize: "12px", padding: "2px" }}>{obj.propertyDetails.tenure}</span>
                                                {"   "}<span className="btn btn-outline-danger disabled" style={{ fontSize: "12px", padding: "2px" }}>{obj.propertyDetails.property_sub_type}</span>
                                            </p>

                                        </div>
                                        <div className="card-footer" style={{ backgroundColor: "white" }}>
                                            <small className="text-muted">Agent Name: XXX</small>

                                            <div className="d-flex justify-content-end">
                                                <label>Quantity</label>
                                                <input type="number" min="0" style={{ width: "50px" }} onChange={(e)=>setQuantity(obj.id, obj.price, e)} />
                                                <button className="btn btn-success btn-sm mx-3" data={obj.id} amount={obj.price} onClick={addToCart} value="">Add To Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div >
        </>
    )
}