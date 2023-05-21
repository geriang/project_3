const jwt = require('jsonwebtoken')

const generateToken = (user, secret, expiresIn) => {
    return jwt.sign({
      'username': user.username,
      'id': user.id,
      'email': user.email
    },
      secret,
      { expiresIn })
  }


module.exports = generateToken


