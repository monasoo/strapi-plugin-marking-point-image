
"use strict";

module.exports = {

    async createpin(ctx) {
        try {
          ctx.body = await strapi
            .plugin("marking-point-image")
            .service("Product")
            .createpin(ctx.params.id, ctx.request.body);
        } catch (err) {
          ctx.throw(500, err);
        }
    },
    async find(ctx) {
        try {
          return await strapi
            .plugin("marking-point-image")
            .service("Product")
            .find(ctx.query)
        } catch (err) {
          ctx.throw(500, err)
        }
    },
};