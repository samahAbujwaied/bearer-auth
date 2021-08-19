'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./users')
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://jdyeacbnararzc:924da0cf67214a917e2f58127094c00e523f5817c2c821e8f91b2c35f6a43fd3@ec2-54-155-61-133.eu-west-1.compute.amazonaws.com:5432/d9c5j7817ui0fl'
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