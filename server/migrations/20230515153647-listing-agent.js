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
  await db.createTable('listing_agent', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    listing_detail_id: { type: 'int', notNull: true },
    agent_id: { type: 'int', notNull: true }
  });

  await db.addForeignKey('listing_agent', 'listing_details', 'listing_detail_agent_id_fk', {
    "listing_detail_id": "id", // { 'column_in_current_table_name': 'referenced_column_name' }
  }, {
    onDelete: 'RESTRICT', // If a listing_agent is deleted, then all related listing details will not be deleted
    onUpdate: 'CASCADE', // allow updates on the listing_agent table when a listing details row is deleted or updated.
  });

  await db.addForeignKey('listing_agent', 'agents', 'agent_listing_detail_id_fk', {
    "agent_id": "id", // { 'column_in_current_table_name': 'referenced_column_name' }
  }, {
    onDelete: 'RESTRICT', // If a listing_agent is deleted, then all related agents will not be deleted
    onUpdate: 'CASCADE', // allow updates on the listing_agent table when a agents row is deleted or updated.
  });


};

exports.down = async function (db) {
  await db.removeForeignKey('listing_agent', 'listing_detail_agent_id_fk');
  await db.removeForeignKey('listing_agent', 'agent_listing_detail_id_fk');
  await db.dropTable('listing_agent');
};

exports._meta = {
  "version": 1
};
