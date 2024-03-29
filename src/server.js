'use strict';
// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources

const authRoutes = require('./auth/routes');

// Prepare the express app
const app = express();

// App Level MW
app.get('/',(req,res)=>{
  res.json('Is connected ')
})
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);

// Catchalls
// app.use(notFound);
// app.use(errorHandler);
function start(port) {
  app.listen(port, ()=> console.log(`Will run on port ${port}`))
}
module.exports = {
  server: app,
  start:start
};
