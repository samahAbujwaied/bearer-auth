'use strict';
const base64 = require('base-64');
const  user  = require('../models/users')
module.exports =(UserSchema) => (req, res, next) => {

  if (!req.headers.authorization) 
  { 
    next('No Authorization info');
    return; 
  }
  let basic = req.headers.authorization.split(' ');
  console.log('basic auth signuo ----->', basic);
  let encoded = basic.pop();
  console.log('encoded ----->',encoded );
  let [username, pass] = base64.decode(encoded).split(':');
console.log('username----->',username);
console.log('pass=======>',pass);
  // try {
  //   req.user = await user.authenticateBasic(username, pass)
  //   next();
  // } catch (e) {
  //   res.status(403).send('Invalid Login');
  // }
  UserSchema.authenticateBasic(username, password).then(validUser=> {
    req.user = validUser;
    next();
}).catch(err=> next('invalid users'));
}
// onst base64 = require('base-64')

// module.exports = (UserSchema) => (req, res, next) => {
//     console.log('req.headers-----?>',req.headers['authorization']);
//     if (!req.headers['authorization']) {
//         next('No Authorization info');
//         return;
//     }

//     let basicHeaderParts = req.headers.authorization.split(' '); // ['Basic', encoded(username:password)]
//     let encoded = basicHeaderParts.pop();
//     let decoded = base64.decode(encoded); // username:password
//     let [username, password] = decoded.split(":"); // rawan test@1234
   
//     // is this user ok?
//     UserSchema.authenticateBasic(username, password).then(validUser=> {
//         req.user = validUser;
//         next();
//     }).catch(err=> next('invalid users'));
// }