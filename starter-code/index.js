'use strict';

// Start up DB Server
const { db } = require('./src/auth/models/index');
const server = require('./src/server')
db.sync().then(() => {

    // Start the web server
    server.start(2000);
  });

