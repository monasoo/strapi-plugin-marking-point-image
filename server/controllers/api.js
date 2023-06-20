"use strict";

module.exports = {
    async getcategory(ctx) {
        try {
          return await strapi
            .plugin("marking-point-image")
            .service("Api")
            .getcategory(ctx.query)
        } catch (err) {
          ctx.throw(500, err)
        }
    },
    async getimage(ctx) {
        try {
          return await strapi
            .plugin("marking-point-image")
            .service("Api")
            .getimage(ctx.query)
        } catch (err) {
          ctx.throw(500, err)
        }
    },
    async getproduct(ctx) {
        try {
          return await strapi
            .plugin("marking-point-image")
            .service("Api")
            .getproduct(ctx.query)
        } catch (err) {
          ctx.throw(500, err)
        }
    },
};