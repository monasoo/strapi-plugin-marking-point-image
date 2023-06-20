
const plugin = require('./plugin');

module.exports = {
  type: 'admin',
  routes: [
    ...plugin,
  ],
};
