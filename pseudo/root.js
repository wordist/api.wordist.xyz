'use strict';

module.exports = (request, reply) => {
  reply({
    app : 'wordist',
    versions : [
      {
        name : 'v1',
        status : 'unstable'
      }
    ]
  });
};
