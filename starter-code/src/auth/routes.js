'use strict';
require('dotenv').config();
const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const {users} = require('./models');


const basicAuth = require('./middleware/basic.js')
const bearerAuth = require('./middleware/bearer')


authRouter.get('/', (req, res)=> {
  res.send('Its connected')
});
authRouter.post('/signup', async (req, res, next) => {

  console.log("inside signup !!! ");
    console.log('req.body',req.body)
    try {
       req.body.password = await bcrypt.hash(req.body.password, 10);
        const record = await users.create(req.body );
        res.json(record);
    } 
    catch (e) {
        console.log(e);

        res.status(500).json({err: 'invalid'})
    }
});


authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
      user: req.user,
      token: req.user.token
    };
    res.status(200).json(user);
  });
  

authRouter.get('/users', bearerAuth, async (req, res, next) => {
  const userRecords = await users.findAll({});
  const list = userRecords.map(user => user.username);
  res.status(200).json(list);
});

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send("Welcome to the secret area!")
});


module.exports = authRouter;
