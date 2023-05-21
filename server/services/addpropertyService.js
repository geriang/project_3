const propertyData = require('../dal/propertyDAL');
const listingData = require('../dal/listingDAL');
const mediaData = require('../dal/mediaDAL');

class AddPropertyListingService {

  getPropertyByPostalAndType = (postal, propertyType) => {
    return propertyData.getPropertyDetailByPostal_Type(postal, propertyType);
  };

  createListingData = async (pid,
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
    gstValue, mediaDetail) => {
    const listing = await listingData.createListingDetail(pid,
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
      gstValue)

    const lid = listing.id

    for (let i of mediaDetail) {
      await mediaData.createMedia(i.url, i.type, lid)
    }

  };


  createNewPropertyListing = async (
    country,
    block,
    street_name,
    postal_code,
    project_name,
    district,
    coordinate_long,
    coordinate_lat,
    property_type,
    property_sub_type,
    tenure,
    top,
    wef,
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
    mediaDetail) => {
    const property = await propertyData.createPropertyDetail(country,
      block,
      street_name,
      postal_code,
      project_name,
      district,
      coordinate_long,
      coordinate_lat,
      property_type,
      property_sub_type,
      tenure,
      top,
      wef)

    const pid = property.id

    const listing = await listingData.createListingDetail(pid,
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
      gstValue)

    const lid = listing.id

    for (let i of mediaDetail) {
      await mediaData.createMedia(i.url, i.type, lid)
    }

  };

}


module.exports = AddPropertyListingService;