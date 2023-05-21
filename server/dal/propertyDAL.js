const { PropertyDetails } = require("../model");

// exports.getPropertyDetailById = (propertyDetailId) =>
//   PropertyDetails.where({ id: parseInt(propertyDetailId) }).fetch({
//     require: true,
//   });

exports.getPropertyDetailByPostal_Type = (propertyDetailPostal, propertyDetailType) =>
  PropertyDetails.where({ postal_code: propertyDetailPostal, property_type: propertyDetailType }).fetch({
    require: false,
  });


exports.createPropertyDetail = async (
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
  wef
) => {
  const createPropertyDetail = new PropertyDetails({
    "country": country,
    "block": block,
    "street_name": street_name,
    "postal_code": postal_code,
    "project_name": project_name,
    "district": district,
    "coordinate_long": coordinate_long,
    "coordinate_lat": coordinate_lat,
    "property_type": property_type,
    "property_sub_type": property_sub_type,
    "tenure": tenure,
    "top": top,
    "wef": wef,
    created_at: Date.now()
  });

  // remember to save the newly created property detail
  await createPropertyDetail.save();

  return createPropertyDetail;
};





// this is the one working now

// exports.getFullPropertyByType = async (type) => {
//   const data = await new PropertyDetails()
//     .query({ where: { property_type: type } })
//     .fetchAll(
//       {
//         columns: ['id', 'block', 'project_name', 'street_name', 'property_sub_type', 'tenure', 'top', 'coordinate_long', 'coordinate_lat'],
//         withRelated: [{
//           'listingDetails': (r) => {
//             r.column('id', 'property_detail_id', 'price', 'room', 'bath', 'size_built', 'size_land')
//           }
//         }, {
//           'listingDetails.media': (r) => {
//             r.column('listing_detail_id', 'media_url')
//           }
//         }]
//       })
//   return data;
// };


// exports.getPropertyForMainDisplay = () => {
//   return PropertyDetails.fetchAll(
//     { columns: ['id', 'block', 'project_name', 'street_name', 'property_sub_type', 'tenure', 'top', 'coordinate_long', 'coordinate_lat'] })
// };

// exports.getPropertyByType = async (type) => {
//   const result = await PropertyDetails.where({ "property_type": type }).fetchAll(
//     { columns: ['id', 'block', 'project_name', 'street_name', 'property_sub_type', 'tenure', 'top', 'coordinate_long', 'coordinate_lat'] })
//   return result;
// }


// exports.deletePropertyById = async (propertyDetailId) => {
//   // SELECT * where products where id = '1'
//   const property = await this.getPropertyDetailById(propertyDetailId);
//   await property.destroy();
// };
