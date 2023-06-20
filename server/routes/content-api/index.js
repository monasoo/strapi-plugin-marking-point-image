
const plugin = require('./plugin');

module.exports = {
  type: 'content-api',
  routes: [
    ...plugin,
  ],
};
