'use strict';
const SECRET = process.env.SECRET || 'secretstringg';
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
    console.log('in authenticateToken');
    try {
      const parsedToken = jwt.verify(token,SECRET);
      const user = this.findOne({ username: parsedToken.username })
      console.log('user',user);
      if (user) { return user; }
      throw new Error("User Not Found");
    } catch (e) {
      throw new Error(e.message)
    }
  }

  return model;
}

module.exports = userSchema;

 