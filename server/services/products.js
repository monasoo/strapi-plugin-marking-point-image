"use strict";
const config = require("../config");

module.exports = ({ strapi }) => ({
  async createpin(id, data) {
    //console.log(data.data);

    const entries = await strapi.entityService.findMany(
      "api::mark-pin-relation.mark-pin-relation",
      {
        fields: ["*"],
        filters: {
          image_marking_image: data.data.imgID,
          image_marking_product: id,
        },
      }
    );
    console.log(entries.length);
    if (entries.length > 0) {
        return await strapi.entityService.update(
        "api::mark-pin-relation.mark-pin-relation",
        entries[0].id,
        {
          data: {
            setX: data.data.setX,
            setY: data.data.setY,
          },
        }
      );
    } else {
        return await strapi.entityService.create(
        "api::mark-pin-relation.mark-pin-relation",
        {
          data: {
            image_marking_image: data.data.imgID,
            image_marking_product: id,
            setX: data.data.setX,
            setY: data.data.setY,
          },
        }
      );
    }
    //return res
    /* return await strapi.entityService.update(
      "api::image-marking-product.image-marking-product",
      id,
      data
    ); */
  },
  async find(query) {
    let params = new URLSearchParams(query);
    console.log(params.get("img"));
    const entries = await strapi.entityService.findMany(
      "api::image-marking-product.image-marking-product",
      {
        locale: params.get("locale"),
        populate: {
          image_marking_images: {
            fields: ["*"],
            filters: {
              //id: params.get("img"),
              id: {
                $eq: params.get("img"),
              },
            },
          },
          product_image: {
            fields: ["*"],
          },
        },
        sort: "id:desc",
      }
    );

    const c = []
    for (let index = 0; index < entries.length; index++) {
        const res = await strapi.entityService.findMany(
            "api::mark-pin-relation.mark-pin-relation",
            {
              fields: ["*"],
              filters: {
                image_marking_image: params.get("img"),
                image_marking_product: entries[index].id,
              },
            }
        );

        if(entries[index].image_marking_images.length > 0){
            if (res.length > 0) {
                const pin =  await strapi.entityService.findOne('api::mark-pin-relation.mark-pin-relation', res[0].id, {
                    fields: ['*']
                });
                c[index] = Object.assign(entries[index], { setX: pin.setX, setY: pin.setY })
            }else{
                c[index] = entries[index]
            }
        }
    }
    return c.filter(function(el) { return el; }); 
  },
});
