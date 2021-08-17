'use strict';

const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const users = require('./models/users');
// const bearerdb = require('../auth/models/users')
const basicAuth = require('./middleware/basic.js')
const bearerAuth = require('./middleware/bearer.js')
const {Sequelize, DataTypes} = require('sequelize');
const POSTGRES_URI = 'postgres://localhost:5432/user';
// config for prod
const sequelize = new Sequelize(POSTGRES_URI, {});
const UserSchema = users(sequelize, DataTypes);
authRouter.post('/signup', async (req, res, next) => {

  console.log("inside signup !!! ");
    console.log({body: req.body})
    try {
        const password = await bcrypt.hash(req.body.password, 10);
        console.log("req.body.password :", password)
        const record = await UserSchema.create(req.body );
        console.log("record >>>>> ", record)
        // console.log(await record.password);
        res.json(record);
    } catch (e) {
        console.log(e);
        next('invalid')
        // res.status(500).json({err: 'invalid'})
    }
});

authRouter.post('/signin', basicAuth(UserSchema), (req, res, next) => {
  res.status(200).json(req.user);
  // const user = {
  //   user: req.user,
  //   token: req.user.token
  // };
  // res.status(200).json(user);
});

authRouter.get('/users', bearerAuth, async (req, res, next) => {
  const users = await UserSchema.findAll({});
  const list = users.map(user => user.username);
  res.status(200).json(list);
});

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send("Welcome to the secret area!")
});


module.exports = authRouter;
