"use strict";
const config = require("../config");

module.exports = ({ strapi }) => ({
  async find(query) {
    let params = new URLSearchParams(query);
    console.log(params.get("img"));

    const entries = await strapi.entityService.findMany(
        "api::mark-pin-relation.mark-pin-relation",
        {
          fields: ["*"],
          filters: {
            image_marking_image: params.get("img"),
            image_marking_product: params.get("prod"),
          },
        }
      );

      if (entries.length > 0) {
        return await strapi.entityService.findOne('api::mark-pin-relation.mark-pin-relation', entries[0].id, {
            fields: ['*']
        });
      }else{
        return {}
      }
  },
});
