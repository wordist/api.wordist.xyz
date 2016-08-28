'use strict';
const Joi = require('joi');
let internals = {};

internals.getUsers = function (request, reply) {
  if (request.query.name) {
    return reply(internals.findUsers(request.query.name));
  }
  reply(internals.users);
}

internals.findUsers = function (name) {
  return internals.users.filter((user) => {
    return user.name.toLowerCase() === name.toLowerCase();
  });
}

internals.getUser = function (request, reply) {
  const filtered = internals.users.filter((user) => {
    return user.id === parseInt(request.params.id);
  }).pop();
  reply(filtered);
}

module.exports = [
  {
    method: 'GET',
    path: '/',
    config: {
      handler: require('../pseudo/root.js')
    }
  },
  {
    method: 'GET',
    path: '/users',
    config: {
      validate: {
        query: {
          name: Joi.string()
        }
      },
      handler: internals.getUsers
    }
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: internals.getUser
  }
];

internals.users = [
  {
    id: 1,
    name: 'Vishnu'
  },
  {
    id: 2,
    name: 'Vasanth'
  },
  {
    id: 3,
    name: 'Venkat'
  }
];
