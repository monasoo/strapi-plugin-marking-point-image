
"use strict";

module.exports = {

    async create(ctx) {
        try {
          ctx.body = await strapi
            .plugin("marking-point-image")
            .service("Category")
            .create(ctx.request.body);
        } catch (err) {
          ctx.throw(500, err);
        }
    },
    async find(ctx) {
      try {
        return await strapi
          .plugin("marking-point-image")
          .service("Category")
          .find(ctx.query);
      } catch (err) {
        ctx.throw(500, err);
      }
  },
};
