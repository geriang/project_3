const propertyData = require('../dal/propertyDAL');
const listingData = require('../dal/listingDAL');
const mediaData = require('../dal/mediaDAL');

class GetPropertyListingService {

  forMainDisplay = async () => {

    const propertyListings = await listingData.getFullListings();
    return propertyListings.toJSON()
  }


  forMainDisplayByPropertyType = async (type) => {
    const propertyListings = await listingData.getFullListingsByPropertyType(type);
    return propertyListings.toJSON();
  }

  forMainDisplayByPropertyName = async (name) => {
    const propertyListings = await listingData.getFullListingsByName(name);
    return propertyListings.toJSON();
  }

  forMainDisplayByListingType = async (listing) => {
    const propertyListings = await listingData.getFullListingsByListingType(listing);
    return propertyListings.toJSON();
  }

  // forMainDisplayByPropertyNameAndType = async (name, type) => {
  //   const propertyListings = await listingData.getFullListingsByName(name, type);
  //   return propertyListings.toJSON();
  // }


}

module.exports = GetPropertyListingService;