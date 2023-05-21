const express = require('express');
const router = express.Router();
const AddPropertyListingService = require('../../services/addPropertyService');
const GetPropertyListingService = require('../../services/getPropertyService');
const jwt = require('jsonwebtoken');

const AddPropertySvc = new AddPropertyListingService();
const GetPropertySvc = new GetPropertyListingService();

router.post('/add', async (req, res) => {

    // deconstructing user data via refreshToken
    const refreshToken = req.cookies.refreshToken
    console.log("checking refresh token at property.js route", refreshToken)
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    console.log(decoded);

    const agentId = decoded.id;

    console.log("agent id is", agentId)


    // deconstructing property and listing data
    const propertyData = req.body[0]
    const country = "singapore"
    const { propertyTypeValue, propertySubTypeValue, tenureValue, wefValue, topValue } = propertyData
    const { block, roadName, building, postalCode, district } = propertyData.fullAddressData
    const coordinate_long = req.body[0].fullAddressData.coordinates[0]
    const coordinate_lat = req.body[0].fullAddressData.coordinates[1]
    const listingData = req.body[1]
    const { unitValue,
        roomNoValue,
        bathNoValue,
        listingTypeValue,
        listingSubTypeValue,
        termValue,
        sizeBuiltValue,
        sizeLandValue,
        priceValue,
        priceStateValue,
        gstValue,
        maintFeeValue,
        headlineValue,
        descriptionValue,
    } = listingData
    const mediaDetail = req.body[2][0]
    // console.log(mediaDetail)


    try {
        const checkProperty = await AddPropertySvc.getPropertyByPostalAndType(postalCode, propertyTypeValue)
        if (checkProperty) {
            const pid = checkProperty.id
            await AddPropertySvc.createListingData(pid,
                unitValue,
                roomNoValue,
                bathNoValue,
                listingTypeValue,
                listingSubTypeValue,
                termValue,
                priceValue,
                priceStateValue,
                sizeBuiltValue,
                sizeLandValue,
                headlineValue,
                descriptionValue,
                maintFeeValue,
                gstValue, mediaDetail)
            console.log("property.js => existing property found, only listing is added")
            res.send("existing property found, successfully added listing")
        } else {
            await AddPropertySvc.createNewPropertyListing(country,
                block,
                roadName,
                postalCode,
                building,
                district,
                coordinate_long,
                coordinate_lat,
                propertyTypeValue,
                propertySubTypeValue,
                tenureValue,
                topValue,
                wefValue,
                unitValue,
                roomNoValue,
                bathNoValue,
                listingTypeValue,
                listingSubTypeValue,
                termValue,
                priceValue,
                priceStateValue,
                sizeBuiltValue,
                sizeLandValue,
                headlineValue,
                descriptionValue,
                maintFeeValue,
                gstValue,
                mediaDetail
            )
            console.log("property.js => property and listing added")
            res.send("successfully added property and listing")
        }

        // verify user

    } catch (error) {

        console.error(error)
    }

})

router.get('/get', async (req, res) => {
    try {

        const propertyType = req.query.type
        const name = req.query.name
        const listing = req.query.listing

        console.log("property type", propertyType)
        console.log("name", name)
        if (name) {
            const data = await GetPropertySvc.forMainDisplayByPropertyName(name)
            return res.send(data)
        }
        if (propertyType) {
            const data = await GetPropertySvc.forMainDisplayByPropertyType(propertyType)
            return res.send(data)
        }
        if (listing) {
            const data = await GetPropertySvc.forMainDisplayByListingType(listing)
            return res.send(data)
        }
        // if (name && propertyType) {
        //     const data = await GetPropertySvc.forMainDisplayByPropertyNameAndType(name, propertyType)
        //     return res.send(data)
        // }

        const data = await GetPropertySvc.forMainDisplay()
        return res.send(data)


    } catch (error) {
        console.error(error)
    }

})

module.exports = router