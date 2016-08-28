'use strict';

module.exports = [
  {
    method: 'GET',
    path: '/',
    config: {
      handler: require('../pseudo/root.js')
    }
  }
]
.concat(require('../v1/users/routes.js'));
