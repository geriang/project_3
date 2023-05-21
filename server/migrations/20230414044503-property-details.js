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

  await db.createTable('property_details', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    country: { type: 'string', length: '20' },
    block: { type: 'string', length: '20', notNull: true },
    street_name: { type: 'string', length: '50', notNull: true },
    postal_code: { type: 'string', length: '20', notNull: true },
    project_name: { type: 'string', length: '50' },
    district: { type: 'string', length: '20', notNull: true },
    coordinate_long: { type: 'float', length:'50', notNull: true },
    coordinate_lat: { type: 'float', length:'50', notNull: true },
    property_type: { type: 'string', length: '20', notNull: true },
    property_sub_type: { type: 'string', length: '20' },
    tenure: { type: 'string', length: '20', notNull: true },
    top: { type: 'date', notNull: false },
    wef: { type: 'date', notNull: false },
    created_at: { type: 'bigint', notNull: true }

  });
}


exports.down = async function (db) {
  return db.dropTable('property_details');
};

exports._meta = {
  "version": 1
};
