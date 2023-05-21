'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function(db) {
  await db.createTable('cart', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    listing_detail_id: { type: 'int', notNull: true },
    user_id: { type: 'int', notNull: true },
    price: { type: 'int', length: '50' },
    quantity: { type: 'int', length: '50' },
  });

  await db.addForeignKey('cart', 'listing_details', 'listing_detail_user_id_fk', {
    "listing_detail_id": "id", // { 'column_in_current_table_name': 'referenced_column_name' }
  }, {
    onDelete: 'RESTRICT', // If a cart is deleted, then all related listing details will not be deleted
    onUpdate: 'CASCADE', // allow updates on the cart table when a listing details row is deleted or updated.
  });

  await db.addForeignKey('cart', 'users', 'user_listing_detail_id_fk', {
    "user_id": "id", // { 'column_in_current_table_name': 'referenced_column_name' }
  }, {
    onDelete: 'RESTRICT', // If a cart is deleted, then all related user will not be deleted
    onUpdate: 'CASCADE', // allow updates on the cart table when a user row is deleted or updated.
  });

};


exports.down = async function(db) {
  await db.removeForeignKey('cart', 'listing_detail_user_id_fk');
  await db.removeForeignKey('cart', 'user_listing_detail_id_fk');
  await db.dropTable('cart');
};

exports._meta = {
  "version": 1
};
