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
  await db.createTable('users', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    // mobileNo: { type: 'string', length: '20'},
    email: { type: 'string', length: '50', notNull: true },
    password: { type: 'string', length: '100' },
    username: { type: 'string', length: '50' },
    googleId: { type: 'string', length: '50' },
    firstName: { type: 'string', length: '50' },
    lastName: { type: 'string', length: '50' }
  });
};

exports.down = async function(db) {
  return await db.dropTable('users');
};

exports._meta = {
  "version": 1
};
