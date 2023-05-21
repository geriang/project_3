const { BlacklistedToken } = require('../model');

exports.createBlackListedToken = (token) => {
  const blacklistedToken = new BlacklistedToken({
    token,
    created_at: Date.now()
  });
  return blacklistedToken.save()
}

exports.getBlackListedToken = (token) =>
  BlacklistedToken.where({
    token,
  }).fetch({ require: false });



// exports.deleteBlackListedToken = async (token) => {
//   await token.destroy();
// };


