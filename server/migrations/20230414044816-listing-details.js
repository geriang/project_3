'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function (db) {

  await db.createTable('listing_details', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    unit: { type: 'string', length: '20' },
    room: { type: 'int', unsigned: true },
    bath: { type: 'int', unsigned: true },
    listing_type: { type: 'string', length: '50', notNull: true },
    listing_sub_type: { type: 'string', length: '50', notNull: true },
    listing_condition: { type: 'string', length: '50' },
    price: { type: 'int', unsigned: true, notNull: true },
    price_state: { type: 'string', length: '20' },
    size_built: { type: 'int', unsigned: true, notNull: true },
    size_land: { type: 'int', unsigned: true },
    headline: { type: 'string', length: '255', notNull: true },
    description: { type: 'string', length: '2000', notNull: true },
    maint_fee: { type: 'int', unsigned: true },
    gst: { type: 'string', length: '20' },
    property_detail_id: { type: 'int', notNull: true },
    created_at: { type: 'bigint', notNull: true }
  });

  
  // https://db-migrate.readthedocs.io/en/latest/API/SQL/#addforeignkey
  await db.addForeignKey('listing_details', 'property_details', 'property_detail_listing_detail_id_fk', {
    "property_detail_id": "id", // { 'column_in_current_table_name': 'referenced_column_name' }
  }, {
    onDelete: 'RESTRICT', // If a listing is deleted, then all related property details are deleted (cascade the deletion)
    onUpdate: 'CASCADE', // allow updates on the listing table when a property details row is deleted or updated.
  });

};

exports.down = async function (db) {
  await db.removeForeignKey('listing_details', 'property_detail_listing_detail_id_fk');
  await db.dropTable('listing_details');
};


exports._meta = {
  "version": 1
};


