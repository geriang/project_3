const cartData = require('../dal/cartDAL')

class CartService {

  createNewCartItem = (listingId, userId , price, quantity) => {
    return cartData.createCartItems(listingId, userId , price, quantity)
  };

  verifyCartItemByUserAndListingId = (userId, listingId) => {
    return cartData.getCartItemByUserAndListingId(userId, listingId)
  }

  updateCartItemQuantity = (userId, listingId, quantity) => {
    return cartData.updateCartItemQuantity(userId, listingId, quantity)
  }

  getAllCartItemsByUser = async (user) => {
    const allCartItems = await cartData.getCartItemsByUser(user)
    return allCartItems.toJSON()
  };

  deleteCartItem =  async (user, listing)=> {
    const deleteItem = await cartData.deleteCartItems(user, listing)
    return deleteItem
  };


  }

  

module.exports = CartService;