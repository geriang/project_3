const bookshelf = require('../bookshelf');
// one Model class represents one table

// *************Property
const PropertyDetails = bookshelf.model('PropertyDetails', {
  tableName: 'property_details',

  listingDetails() {
    return this.hasMany('ListingDetails', 'property_detail_id');
  }
});

// ***********Listing
const ListingDetails = bookshelf.model('ListingDetails', {
  tableName: 'listing_details',

  propertyDetails() {
    return this.belongsTo('PropertyDetails', 'property_detail_id');
  },

  media() {
    return this.hasMany('Media', 'listing_detail_id');
  },

  agents() {
    return this.belongsToMany('Agents', 'listing_agent', 'listing_detail_id', 'agent_id');
  },

  users() {
    return this.belongsToMany('Users', 'cart', 'listing_detail_id', 'user_id' );
  }

});

// ************Media
const Media = bookshelf.model('Media', {
  tableName: 'media',

  listingDetails() {
    return this.belongsTo('ListingDetails', 'listing_detail_id');
  },
})

// ***************Users
const Users = bookshelf.model('Users', {
  tableName: 'users',

  listingDetails() {
    return this.belongsToMany('ListingDetails', 'cart', 'user_id', 'listing_detail_id')
  }

});


// *****************Agents
const Agents = bookshelf.model('Agents', {
  tableName: 'agents',

  listingDetails() {
    return this.belongsToMany('ListingDetails', 'listing_agent', 'agent_id', 'listing_detail_id')
  }
});

const BlacklistedToken = bookshelf.model('BlacklistedToken', {
  tableName: 'blackListed_tokens'
});

// ******************Listng_Agent

const Listing_Agent = bookshelf.model('Listing_Agent', {
  tableName: 'listing_agent',

  listingDetails() {
    return this.belongsTo('ListingDetails', 'listing_detail_id')
  },

  agents() {
    return this.belongTo('Agents', 'agent_id')
  }
});

// ********************Cart
const Cart = bookshelf.model('Cart', {
  tableName: 'cart',

  listingDetails() {
    return this.belongsTo('ListingDetails', 'listing_detail_id')
  },

  users() {
    return this.belongTo('Users', 'user_id')
  }
});




module.exports = {
  PropertyDetails,
  ListingDetails,
  Media,
  Listing_Agent,
  Users,
  Agents,
  BlacklistedToken,
  Cart

};