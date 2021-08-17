'use strict';
const SECRET = process.env.SECRET || "samah:12345";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = (sequelize, DataTypes) => {
  const model = sequelize.define('testing', {
    username: {
       type: DataTypes.STRING, 
       allowNull: false,
        unique: true },
    password: { 
      type: DataTypes.STRING,
       allowNull: false, },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username },SECRET);
      },
      set(tokenObj) {
         return jwt.sign(tokenObj, SECRET);
      }
    }
  });

  model.beforeCreate(async (user) => {
    let hashedPass = bcrypt.hash(user.password, 10);
    user.password = hashedPass;
  });

  // Basic AUTH: Validating strings (username, password) 
  model.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ where: {username: username}})
    const valid = await bcrypt.compare(password, user.password)
    console.log('valid----->',valid);
    if (valid) { return user; }
    throw new Error('Invalid User');

  }
  

  // Bearer AUTH: Validating a token
  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, process.env.SECRET);
      const user = this.findOne({ username: parsedToken.username })
      if (user) { return user; }
      throw new Error("User Not Found");
    } catch (e) {
      throw new Error(e.message)
    }
  }

  return model;
}

module.exports = userSchema;

 
    
//     Users.authenticateToken = async function(token) {
//         try {
//             console.log('samah token -------->',token);
//             console.log('samah secret ------->',SECRET);
//             console.log('jwt verify------>',jwt.verify(token, SECRET));
//             const parsedToken = jwt.verify(token, SECRET); // {username: rawan ... }
//             console.log('samah verify----->',parsedToken);
//             const user = await this.findOne({ where: {username: parsedToken.username} });
//             console.log('user token ------>',user);
//             if(user) {
//                 return user;
//             }
//             throw new Error('invalid token')
//         } catch(e) {
//             throw new Error(e.message);
//         }
        
//     }

//     return Users;
// }



// module.exports = UserSchema;