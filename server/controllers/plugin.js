
"use strict";

module.exports = {

  async locales(ctx) {
    try {
      return await strapi
        .plugin("marking-point-image")
        .service("myService")
        .getLocales()
    } catch (err) {
      ctx.throw(500, err)
    }
  },
  async config(ctx) {
    try {
      return await strapi
        .plugin("marking-point-image")
        .service("myService")
        .getConfig()
    } catch (err) {
      ctx.throw(500, err)
    }
  },
  
};
