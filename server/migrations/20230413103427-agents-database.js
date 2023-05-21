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
  await db.createTable('agents', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    ceaNo: { type: 'string', length: '20' },
    mobileNo: { type: 'string', length: '20', notNull: true },
    email: { type: 'string', length: '50', notNull: true },
    password: { type: 'string', notNull: true },
    firstName: { type: 'string', length: '50', notNull: true },
    lastName: { type: 'string', length: '50', notNull: true }
  });
};

exports.down = async function (db) {
  return await db.dropTable('agents');
};

exports._meta = {
  "version": 1
};
