
"use strict";

module.exports = {

    async find(ctx) {
        try {
          return await strapi
            .plugin("marking-point-image")
            .service("Images")
            .find(ctx.query)
        } catch (err) {
          ctx.throw(500, err)
        }
    },
};