// update users to agent when ready
const { Users } = require('../model');
// const getHashedPassword = require('../utils/hashPassword');


exports.createUser = (username, password, email) => {
  const user = new Users({
    username,
    password: getHashedPassword(password),
    email,
  });
  return user.save()
}

exports.getUserByUsername = (username) =>
  Users.where({
    username,
  }).fetch({ require: false });

exports.getUserByEmail = (email) =>
  Users.where({
    email,
  }).fetch({ require: false });

// exports.getUserById = (id) =>
//   Users.where({
//     id,
//   }).fetch({ require: false });

/**
 * Checks the credentials and returns the user object if verification is
 * successful.
 */
exports.verify = (username, password) =>
  this.getUserByUsername(username).then((user) => {
    if (!user || user.get("password") !== getHashedPassword(password)) {
      return null;
    }
    return user;
  });

exports.createGoogleUser = (googleId, username, email, firstName, lastName) => {
  const user = new Users({
    googleId,
    username,
    email,
    firstName,
    lastName
  });
  return user.save()
}


