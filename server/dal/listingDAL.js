const { ListingDetails } = require("../model");

// exports.getListingDetailById = (ListingDetailId) =>
//     ListingDetails.where({ id: parseInt(ListingDetailId) }).fetch({
//         require: true,
//     });

exports.createListingDetail = async (
  pid,
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
) => {
  const createListingDetail = new ListingDetails({
    "property_detail_id": pid,
    "unit": unitValue,
    "room": roomNoValue,
    "bath": bathNoValue,
    "listing_type": listingTypeValue,
    "listing_sub_type": listingSubTypeValue,
    "listing_condition": termValue,
    "price": priceValue,
    "price_state": priceStateValue,
    "size_built": sizeBuiltValue,
    "size_land": sizeLandValue,
    "headline": headlineValue,
    "description": descriptionValue,
    "maint_fee": maintFeeValue,
    "gst": gstValue,
    created_at: Date.now()
  });

  // remember to save the newly created property detail
  await createListingDetail.save();

  return createListingDetail;
};



exports.getFullListings = async () => {
  const data = await new ListingDetails()
    .fetchAll(
      {
        columns: ['id', 'property_detail_id', 'price', 'room', 'bath', 'size_built', 'size_land'],
        withRelated: [{
          'propertyDetails': (r) => {
            r.column('id', 'block', 'project_name', 'street_name', 'property_sub_type', 'tenure', 'top', 'coordinate_long', 'coordinate_lat')
          }
        }, {
          'media': (r) => {
            r.column('listing_detail_id', 'media_url')
          }
        }]
      })
  return data;
};

// ***
exports.getFullListingsByPropertyType = async (type) => {
  const data = await ListingDetails.query((r) => {
    r.innerJoin('property_details', 'listing_details.property_detail_id', 'property_details.id');
    r.where('property_details.property_type', '=', type);
  })
    .fetchAll({
      columns: ['listing_details.id', 'property_detail_id', 'price', 'room', 'bath', 'size_built', 'size_land'],
      withRelated: [{
        'propertyDetails': (r) => {
          r.column('property_details.id', 'block', 'project_name', 'street_name', 'property_sub_type', 'tenure', 'top', 'coordinate_long', 'coordinate_lat');
        }
      }, {
        'media': (r) => {
          r.column('listing_detail_id', 'media_url');
        }
      }]
    });
  return data;
};

// ***
exports.getFullListingsByName = async (name) => {
  const data = await ListingDetails.query((r) => {
    r.innerJoin('property_details', 'listing_details.property_detail_id', 'property_details.id');
    r.whereRaw("property_details.street_name LIKE ?", [`%${name}%`])
      .whereRaw("property_details.project_name LIKE ?", [`%${name}%`]);
  })
    .fetchAll({
      columns: ['listing_details.id', 'property_detail_id', 'price', 'room', 'bath', 'size_built', 'size_land'],
      withRelated: [{
        'propertyDetails': (r) => {
          r.column('property_details.id', 'block', 'project_name', 'street_name', 'property_sub_type', 'tenure', 'top', 'coordinate_long', 'coordinate_lat');
        }
      }, {
        'media': (r) => {
          r.column('listing_detail_id', 'media_url');
        }
      }]
    });
  return data;
};

// ***
exports.getFullListingsByListingType = async (listing) => {
  const data = await new ListingDetails()
    .query({ where: { listing_type: listing } })
    .fetchAll(
      {
        columns: ['id', 'property_detail_id', 'price', 'room', 'bath', 'size_built', 'size_land'],
        withRelated: [{
          'propertyDetails': (r) => {
            r.column('id', 'block', 'project_name', 'street_name', 'property_sub_type', 'tenure', 'top', 'coordinate_long', 'coordinate_lat')
          }
        }, {
          'media': (r) => {
            r.column('listing_detail_id', 'media_url')
          }
        }]
      })
  return data;
};


// ***
// exports.getFullListingsByNameAndType = async (name, type) => {
//   const data = await ListingDetails.query((r) => {
//     r.innerJoin('property_details', 'listing_details.property_detail_id', 'property_details.id');
//     if (type !== null) {
//       r.where('property_details.property_type', '=', type);
//     }
//     if (name !== null) {
//       r.whereRaw("property_details.street_name LIKE ?", [`%${name}%`])
//         .whereRaw("property_details.project_name LIKE ?", [`%${name}%`]);
//     }
//   })
//     .fetchAll({
//       columns: ['listing_details.id', 'property_detail_id', 'price', 'room', 'bath', 'size_built', 'size_land'],
//       withRelated: [{
//         'propertyDetails': (r) => {
//           r.column('property_details.id', 'block', 'project_name', 'street_name', 'property_sub_type', 'tenure', 'top', 'coordinate_long', 'coordinate_lat');
//         }
//       }, {
//         'media': (r) => {
//           r.column('listing_detail_id', 'media_url');
//         }
//       }]
//     });
//   return data;
// };




// exports.getListingForMainDisplay = () => {
//     return ListingDetails.fetchAll({ columns: ['id','property_detail_id','price','room','bath', 'size_built', 'size_land']})
//   };


// exports.getListingByPropertyId = async (pid) => {
//     return await ListingDetails.where({"property_detail_id": pid}).fetchAll(
//       { columns: ['id','property_detail_id','price','room','bath', 'size_built', 'size_land'] })
//   };



// exports.getListingByType = async (type) => {
//     return await ListingDetails.where({listing_type: type}).fetchAll(
//       { columns: ['id','property_detail_id','price','room','bath', 'size_built', 'size_land'] })
//   };



// exports.deleteListingById = async (listingDetailId) => {
//     // SELECT * where products where id = '1'
//     const listing = await this.getListingDetailById(listingDetailId);
//     await listing.destroy();
// };