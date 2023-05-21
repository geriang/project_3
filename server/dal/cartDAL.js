const { Cart } = require("../model");

exports.createCartItems = (listingId, userId, price, quantity) => {
  const cartItem = new Cart({
    listing_detail_id: listingId,
    user_id: userId,
    price,
    quantity
  });
  return cartItem.save()
}

// exports.getCartItemByListingId = (listingId) => {
//   Cart.where({ listing_detail_id: listingId }).fetch({ require: false })
// }

exports.deleteCartItems = async (userId, listingId) => {
  const cartItem = await Cart.where({ user_id: userId, listing_detail_id: listingId }).fetch({ require: false })
  return await cartItem.destroy()
}


exports.getCartItemsByUser = (user) => {
  const data = Cart
    .where({ user_id: user })
    .fetchAll({
      withRelated: [{
        'listingDetails.propertyDetails': (r) => {
          r.column('id', 'block', 'project_name', 'street_name')
        },
      }, {
        'listingDetails.media': (r) => {
          r.column('listing_detail_id', 'media_url')
        }
      }, {
        'listingDetails': (r) => {
          r.column('id', 'description', 'property_detail_id')

        }
      }]

    });

  return data;
};