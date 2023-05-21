import React, { useState, useMemo } from 'react';
import DataContext from './DataContext';


export default function DataProvider(props) {

    const [propertyData, setPropertyData] = useState([{

        // addressValue: "",
        fullAddressData: {},
        propertyTypeValue: null,
        propertySubTypeValue: null,
        tenureValue: null,
        wefValue: null,
        topValue: null,
        // existingPropertyDataId: "",

    }]);

    const [listingData, setListingData] = useState([{
        unitValue: null,
        roomNoValue: null,
        bathNoValue: null,
        listingTypeValue: null,
        listingSubTypeValue: null,
        termValue: null,
        sizeBuiltValue: 0,
        sizeLandValue: 0,
        priceValue: 0,
        priceStateValue: null,
        builtPsfValue: null,
        landPsfValue: null,
        gstValue: null,
        maintFeeValue: 0,
        headlineValue: null,
        descriptionValue: null,
    
    }]);

    const [mediaData, setmediaData] = useState([]);

    const [formLabelData] = useState([{

        // titles of form blocks 
        formBlockTitle1: "Listing Type",
        formBlockTitle2: "Address",
        formBlockTitle3: "Property Type",
        formBlockTitle4: "Sub-type",
        formBlockTitle5: "Description",
        formBlockTitle6: "Built-in Area (sqft)",
        formBlockTitle7: "Land Area (sqft)",
        formBlockTitle8: "Price (SGD)",
        formBlockTitle9: "Headline",
        formBlockTitle10: "Type of Sale",
        formBlockTitle11: "Tenure",
        formBlockTitle12: "With Effect From",
        formBlockTitle13: "TOP Year",
        formBlockTitle14: "Unit No.",
        formBlockTitle15: "Condition/Term",
        formBlockTitle16: "Price Indication",
        formBlockTitle17: "GST",
        formBlockTitle18: "Maintanence Fee",
        formBlockTitle19: "Room(s)",
        formBlockTitle20: "Bathroom(s)"

    }]);

    const [formDropdownData] = useState([{

        // Dropdown Arrays
        formBlockArray1: ["", "For Sale", "For Rent", "Room Rental"],
        formBlockArray2: ["", "Owner Sale", "Mortgagee Sale", "Receiver Sale", "Bank Sale", "Estate Sale", "MCST Sale", "Owner Auction", "Bank Auction"],
        formBlockArray3: ["", "HDB", "Condo", "Landed", "Retail", "Office", "Industrial", "Land"],
        formBlockArray4: ["", "30-year", "60-year", "99-year", "103-year", "110-year", "999-year", "9999-year", "Freehold"],
        formBlockArray5: ["", "Vacant Possession", "Sale with Tenancy", "Sale with/without Tenancy"],
        formBlockArray6: ["", "Starting From", "Negotiable", "Indicative Guide Price"],
        formBlockArray7: ["", "Yes", "No"],
        formBlockArray8: [null, "Studio", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        formBlockArray9: [null, "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        HDB: ["", "1-Room / Studio", "2I (Improved)", "2S (Standard)", "2A", "3A", "3NG (New Generation)", "3A (Modified)", "3NG (Modified)", "3I (Improved)", "3S (Simplified)", "3STD (Standard)", "4A", "4NG (New Generation)", "4PA (4 Room Premium Apartment)", "4S (Simplified)", "4I (Improved)", "4STD (Standard)", "5A", "5I", "5PA (5 Room Premium Apartment)", "5S", "Jumbo", "EA (Exec Apartment)", "EM (Exec Maisonette)", "MG (Multi-Generation)", "Terrace"],
        Condo: ["", "Apartment", "Cluster House", "Condominium", "Executive Condominium", "Walk-up"],
        Landed: ["", "Good Class Bungalow", "Conservation House", "Corner Terrace", "Detached House", "Bungalow House", "Cluster House", "Land Only", "Semi-Detached House", "Shophouse", "Terrace House", "Town House"],
        Retail: ["", "Food & Beverage", "Mall Shop", "Medical", "Other Retail", "Shop / Shophouse"],
        Office: ["", "Business / Science Park", "Office"],
        Industrial: ["", "Dormitory", "Factory / Workshop (B2)", "Light Industrial (B1)", "Warehouse"],
        Land: ["", "Land with Building / En-bloc", "Land Only"]

    }])


    const context = useMemo(() => {

        return {

            getPropertyData: () => {
                return propertyData
            },

            getPropertyType: () => {
                return propertyData.propertyTypeValue
            },

            updatePropertyData: (e, value) => {
                let clone = propertyData.slice();
                const indexToModifiy = clone.findIndex((obj) => {
                    return obj.hasOwnProperty(e)
                });
                const modifiedClone = [...clone.slice(0, indexToModifiy), { ...clone[indexToModifiy], [e]: value }, ...clone.slice(indexToModifiy + 1)]
                setPropertyData(modifiedClone)
            },

            getListingData: () => {
                return listingData;
            },

            updateListingData: (e, value) => {
                let clone = listingData.slice();
                const indexToModifiy = clone.findIndex((obj) => {
                    return obj.hasOwnProperty(e)
                });
                const modifiedClone = [...clone.slice(0, indexToModifiy), { ...clone[indexToModifiy], [e]: value }, ...clone.slice(indexToModifiy + 1)]
                setListingData(modifiedClone)
            },

            getMediaData: () => {
                return mediaData;
            },

            updateMediaData: (value) => {
               return setmediaData(value)

            },

            getFormLabel: () => {
                return formLabelData
            },

            getDropdownData: () => {
                return formDropdownData
            },



        };
    }, [propertyData, listingData, mediaData, formLabelData, formDropdownData]);


    return (
        <>
            <DataContext.Provider value={context}>
                {props.children}
            </DataContext.Provider>
        </>
    );
};