import React, { useContext, useState, useCallback, useEffect } from 'react';
import DataContext from './DataContext';
import TextBlock from './blocks/TextBlock';
import DropdownBlock from './blocks/DropdownBlock'
import GetAddress from './blocks/GetAddress';
import NumberBlock from './blocks/NumberBlock';
import axios from 'axios';
import ImageUpload from './ImageUpload';


export default function AddProperty() {

    const formData = useContext(DataContext)

    const [data, setData] = useState(null);

    const postPropertyData = useCallback(async () => {

        // withCredentials is to send session/cookie info to server
        await axios.post('http://localhost:3000/property/add', data, { withCredentials: true })

    }, [data])

    useEffect(() => {

        // updating property data
        const propertyData = formData.getPropertyData()
        const listingData = formData.getListingData()
        const mediaData = formData.getMediaData()
        setData([...propertyData, ...listingData, {...[mediaData]}])
        console.log(data)

    }, [formData])


    return (
        <>
            <div className='container'>

                <GetAddress label={formData.getFormLabel().map((d) => { return d.formBlockTitle2 })}
                    updateParentValue={(value) => { formData.updatePropertyData("fullAddressData", value) }} />

                <DropdownBlock label={formData.getFormLabel().map((d) => { return d.formBlockTitle3 })}
                    option={formData.getDropdownData().map((d) => { return (d.formBlockArray3) })}
                    updateParentValue={(value) => { formData.updatePropertyData("propertyTypeValue", value) }} />

                <DropdownBlock label={formData.getFormLabel().map((d) => { return d.formBlockTitle4 })}
                    option={
                        formData.getDropdownData().map((d) => { return (d[formData.getPropertyData().map((d) => { return (d.propertyTypeValue) })]) })
                    }
                    updateParentValue={(value) => { formData.updatePropertyData("propertySubTypeValue", value) }} />

                <DropdownBlock label={formData.getFormLabel().map((d) => { return d.formBlockTitle11 })}
                    option={formData.getDropdownData().map((d) => { return (d.formBlockArray4) })}
                    updateParentValue={(value) => { formData.updatePropertyData("tenureValue", value) }} />

                <TextBlock type={"date"} label={formData.getFormLabel().map((d) => { return d.formBlockTitle12 })}
                    updateParentValue={(value) => { formData.updatePropertyData("wefValue", value) }} />

                <TextBlock type={"date"} label={formData.getFormLabel().map((d) => { return d.formBlockTitle13 })}
                    updateParentValue={(value) => { formData.updatePropertyData("topValue", value) }} />

                {/* Break */}

                <TextBlock type={"text"} label={formData.getFormLabel().map((d) => { return d.formBlockTitle14 })}
                    updateParentValue={(value) => { formData.updateListingData("unitValue", value) }} />

                {formData.getPropertyData().map((d) => d.propertyTypeValue).some((value) => ["Condo", "HDB", "Landed"].includes(value)) ? (
                    <DropdownBlock label={formData.getFormLabel().map((d) => d.formBlockTitle19)}
                        option={formData.getDropdownData().map((d) => { return (d.formBlockArray8) })}
                        updateParentValue={(value) => { formData.updateListingData("roomNoValue", value) }} />) : null
                }

                {formData.getPropertyData().map((d) => d.propertyTypeValue).some((value) => ["Condo", "HDB", "Landed"].includes(value)) ? (
                    <DropdownBlock label={formData.getFormLabel().map((d) => d.formBlockTitle20)}
                        option={formData.getDropdownData().map((d) => { return (d.formBlockArray9) })}
                        updateParentValue={(value) => { formData.updateListingData("bathNoValue", value) }} />) : null
                }

                <DropdownBlock label={formData.getFormLabel().map((d) => { return d.formBlockTitle1 })}
                    option={formData.getDropdownData().map((d) => { return (d.formBlockArray1) })}
                    updateParentValue={(value) => { formData.updateListingData("listingTypeValue", value) }} />

                <DropdownBlock label={formData.getFormLabel().map((d) => { return d.formBlockTitle10 })}
                    option={formData.getDropdownData().map((d) => { return (d.formBlockArray2) })}
                    updateParentValue={(value) => { formData.updateListingData("listingSubTypeValue", value) }} />

                <DropdownBlock label={formData.getFormLabel().map((d) => { return d.formBlockTitle15 })}
                    option={formData.getDropdownData().map((d) => { return (d.formBlockArray5) })}
                    updateParentValue={(value) => { formData.updateListingData("termValue", value) }} />


                <NumberBlock label={formData.getFormLabel().map((d) => { return d.formBlockTitle6 })}
                    updateParentValue={(value) => { formData.updateListingData("sizeBuiltValue", value) }} suffix={" sqft"} />


                {formData.getPropertyData().map((d) => d.propertyTypeValue).some((value) => ["Landed", "Retail", "Industrial", "Land"].includes(value)) ? (
                    <NumberBlock label={formData.getFormLabel().map((d) => { return d.formBlockTitle7 })}
                        updateParentValue={(value) => { formData.updateListingData("sizeLandValue", value) }} suffix={" sqft"} />) : null
                }

                {/* <TextBlock label={formData.getFormLabel().map((d) => { return d.formBlockTitle7 })}
                    updateParentValue={(value) => { formData.updateListingData("sizeLandValue", value) }} /> */}

                <NumberBlock label={formData.getFormLabel().map((d) => { return d.formBlockTitle8 })}
                    updateParentValue={(value) => { formData.updateListingData("priceValue", value) }} prefix={"$"} />

                <DropdownBlock label={formData.getFormLabel().map((d) => { return d.formBlockTitle16 })}
                    option={formData.getDropdownData().map((d) => { return (d.formBlockArray6) })}
                    updateParentValue={(value) => { formData.updateListingData("priceStateValue", value) }} />

                {/* Break */}

                <DropdownBlock label={formData.getFormLabel().map((d) => { return d.formBlockTitle17 })}
                    option={formData.getDropdownData().map((d) => { return (d.formBlockArray7) })}
                    updateParentValue={(value) => { formData.updateListingData("gstValue", value) }} />

                <NumberBlock label={formData.getFormLabel().map((d) => { return d.formBlockTitle18 })}
                    updateParentValue={(value) => { formData.updateListingData("maintFeeValue", value) }} prefix={"$"} suffix={" /quarter"} />

                <TextBlock label={formData.getFormLabel().map((d) => { return d.formBlockTitle9 })}
                    updateParentValue={(value) => { formData.updateListingData("headlineValue", value) }} />

                <TextBlock label={formData.getFormLabel().map((d) => { return d.formBlockTitle5 })}
                    updateParentValue={(value) => { formData.updateListingData("descriptionValue", value) }} />

                <div>
                    {/* <button className='btn btn-success' onClick={()=>{widgetRef.current.open()}}>Upload Media</button> */}
                    {/* <AdvancedImage cldImg={myImage} /> */}
                    <ImageUpload/>
                </div>

                <div>
                    <button className='btn btn-danger' onClick={postPropertyData}>Submit</button>
                </div>

            </div>
        </>
    )

}


