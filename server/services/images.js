"use strict";
const config = require("../config");

module.exports = ({ strapi }) => ({
  async create(data) {
    return await strapi.entityService.create(
      "api::image-marking-image.image-marking-image",
      data
    );
  },
  async find(query) {
    let params = new URLSearchParams(query);
    //console.log(params.get("filters"));
    if (params.get("filters") !== null && params.get("filters") !== "null") {
      return await strapi.entityService.findMany(
        "api::image-marking-image.image-marking-image",
        {
          locale: params.get("locale"),
          sort: { id: "DESC" },
          populate: {
            image_marking_categories: {
              fields: ["*"],
              filters: {
                //id: params.get("filters"),
                id: {
                    $eq: params.get("filters"),
                },
              },
            },
            image: {
              fields: ["*"],
            },
          },
        }
      );
    } else {
      return await strapi.entityService.findMany(
        "api::image-marking-image.image-marking-image",
        {
          locale: params.get("locale"),
          sort: { id: "DESC" },
          populate: "*",
        }
      );
    }
  },
});
