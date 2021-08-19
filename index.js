'use strict';

// Start up DB Server
require('dotenv').config();
const { db } = require('./src/auth/models/index');
const server = require('./src/server')
const port = process.env.PORT || 8001 ;
db.sync().then(() => {

    // Start the web server
    server.start(port);
  });
