const tokenData = require('../dal/rftokenDAL')

class BlacklistedTokenService {

  createNewBlToken = (token) => {
    return tokenData.createBlackListedToken(token)
  };

  getBlToken = (token) => {
    return tokenData.getBlackListedToken(token)
  };

  deleteBlToken = (token) => {
    return tokenData.deleteBlackListedToken(token)
  }

  }

  

module.exports = BlacklistedTokenService;