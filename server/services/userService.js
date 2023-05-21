const userData = require('../dal/userDAL')

class UserService {

  createNewUser = (username,password,email) => {
    return userData.createUser(username,password,email)
  };

  createNewGoogleUser = (googleId, username, email, firstName, lastName) => {
    return userData.createGoogleUser(googleId, username, email, firstName, lastName)
  };

  verifyUserByID = (id) =>{
    return userData.getUserById(id);
  };

  verifyUserByEmail = (email) => {
    return userData.getUserByEmail(email);
  };

  verifyUserByUsernamePw = (username, password)=>{
    return userData.verify(username, password);
  }
 
  }

  

module.exports = UserService;