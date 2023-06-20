# strapi-plugin-marking-point-image

marking-point-image

Install This Plugin In Strapi

- [cmd] npm i strapi-plugin-marking-pin-point-image
- copy node_modules/strapi-plugin-marking-pin-point-image/api/\* => project-you/sre/api
- add file project-you/config/plugins.js
- add code this in plugins.js
  module.exports = {
  "marking-point-image": {
  enabled: true,
  config: {
  localization: true,
  },
  },
  };
- [cmd] npm run build && npm run develop
