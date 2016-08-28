'use strict';
const Hapi = require('hapi');
const Inert = require('inert');
const Lout = require('lout');
const Vision = require('vision');
const initialiseRoutes = require('./init/initialiseRoutes');
const config = {};
const server = new Hapi.Server(config);

const port = 8081;
const host = 'localhost';

server.connection({
  port: port,
  host: host
});

const loutRegister = {
  register: Lout,
  options: {
    endpoint: '/docs'
  }
};

server.register([Vision, Inert, loutRegister], function (err) {
  if (err) {
    console.error('Failed loading plugins');
    process.exit(1);
  }
  server.route(initialiseRoutes);
  server.start(function () {
    console.log('Server running at:', server.info.uri);
  });
});

module.exports = server;