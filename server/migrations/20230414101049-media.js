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
  await db.createTable('media', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    media_type: { type: 'string', length: '20', notNull: true },
    media_url: { type: 'string', length: '500', notNull: true },
    listing_detail_id: { type: 'int', notNull: true },
    created_at: { type: 'bigint', notNull: true }
  });

  // https://db-migrate.readthedocs.io/en/latest/API/SQL/#addforeignkey
  await db.addForeignKey('media', 'listing_details', 'listing_detail_media_id_fk', {
    "listing_detail_id": "id", // { 'column_in_current_table_name': 'referenced_column_name' }
  }, {
    onDelete: 'RESTRICT', // If a media is deleted, then all related listing details will not be deleted
    onUpdate: 'CASCADE', // allow updates on the media table when a listing details row is deleted or updated.
  });

};

exports.down = async function (db) {
  await db.removeForeignKey('media', 'listing_detail_media_id_fk');
  await db.dropTable('media');
};

exports._meta = {
  "version": 1
};
