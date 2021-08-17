'use strict';
const base64 = require('base-64')
const  users  = require('../models/users');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization)
  { next('Invalid Login')
  return;
   }
  try {

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateWithToken(token);
    req.user = validUser;
    req.token = validUser.token;
    next()

  } catch (e) {
    res.status(403).send('Invalid Login');;
  }
}


