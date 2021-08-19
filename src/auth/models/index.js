'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./users')
const DATABASE_URL = process.env.DATABASE_URL 
let sequelizeOptions = {
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        }
      }
  } ;
let sequelize = new Sequelize(DATABASE_URL,sequelizeOptions);


module.exports = {
    db: sequelize,
    users: userModel(sequelize, DataTypes)
};