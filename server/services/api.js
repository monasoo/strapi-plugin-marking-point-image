module.exports = ({ strapi }) => ({
  // http://localhost:1337/api/marking-point-image/category/find?locale=en&id=6
  async getcategory(query) {
    let params = new URLSearchParams(query);
    if (params.get("id")) {
      return await strapi.entityService.findMany(
        "api::image-marking-category.image-marking-category",
        {
          locale: params.get("locale"),
          filters: {
            id: parseInt(params.get("id")),
          },
          populate: {
            category_image: {
              fields: ["*"],
            },
          },
          sort: "id:desc",
        }
      );
    } else {
      return await strapi.entityService.findMany(
        "api::image-marking-category.image-marking-category",
        {
          locale: params.get("locale"),
          populate: {
            category_image: {
              fields: ["*"],
            },
          },
          sort: "id:desc",
        }
      );
    }
  },
  // http://localhost:1337/api/marking-point-image/image/find?locale=en&cateid=1
  async getimage(query) {
    let params = new URLSearchParams(query);
    if (params.get("cateid")) {
      return await strapi.entityService.findMany(
        "api::image-marking-image.image-marking-image",
        {
          locale: params.get("locale"),
          sort: { id: "DESC" },
          populate: {
            image_marking_categories: {
              fields: ["*"],
              filters: {
                id: {
                  $eq: parseInt(params.get("cateid")),
                },
              },
            },
            image: {
              fields: ["*"],
            },
          },
        }
      );
    } else if (params.get("id")) {
      return await strapi.entityService.findMany(
        "api::image-marking-image.image-marking-image",
        {
          filters: {
            id: parseInt(params.get("id")),
          },
          locale: params.get("locale"),
          sort: { id: "DESC" },
          populate: ["image_marking_categories", "image"],
        }
      );
    } else {
      return await strapi.entityService.findMany(
        "api::image-marking-image.image-marking-image",
        {
          locale: params.get("locale"),
          sort: { id: "DESC" },
          populate: ["image_marking_categories", "image"],
        }
      );
    }
  },
  // http://localhost:1337/api/marking-point-image/product/find?locale=en&imgid=2
  async getproduct(query) {
    let params = new URLSearchParams(query);
    if (params.get("imgid")) {
      const entries = await strapi.entityService.findMany(
        "api::image-marking-product.image-marking-product",
        {
          locale: params.get("locale"),
          populate: {
            image_marking_images: {
              fields: ["*"],
              filters: {
                id: {
                  $eq: parseInt(params.get("imgid")),
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
      const c = [];
      for (let index = 0; index < entries.length; index++) {
        const res = await strapi.entityService.findMany(
          "api::mark-pin-relation.mark-pin-relation",
          {
            fields: ["*"],
            filters: {
              image_marking_image: parseInt(params.get("imgid")),
              image_marking_product: entries[index].id,
            },
          }
        );

        //console.log(entries[index].image_marking_images[0])
        if (entries[index].image_marking_images.length > 0) {
          if (res.length > 0) {
            const pin = await strapi.entityService.findOne(
              "api::mark-pin-relation.mark-pin-relation",
              res[0].id,
              {
                fields: ["*"],
              }
            );
            c[index] = Object.assign(entries[index], {
              setX: pin.setX,
              setY: pin.setY,
            });
          } else {
            c[index] = entries[index];
          }
        }
      }
      return c.filter(function (el) {
        return el;
      });
    } else if (params.get("id")) {
      const entries = await strapi.entityService.findMany(
        "api::image-marking-product.image-marking-product",
        {
          locale: params.get("locale"),
          filters: {
            id: parseInt(params.get("id")),
          },
          populate: {
            image_marking_images: {
              fields: ["*"],
            },
            product_image: {
              fields: ["*"],
            },
          },
          sort: "id:desc",
        }
      );
      const c = [];
      for (let index = 0; index < entries.length; index++) {
        const res = await strapi.entityService.findMany(
          "api::mark-pin-relation.mark-pin-relation",
          {
            fields: ["*"],
            filters: {
              image_marking_image: parseInt(params.get("imgid")),
              image_marking_product: entries[index].id,
            },
          }
        );

        if (res.length > 0) {
          const pin = await strapi.entityService.findOne(
            "api::mark-pin-relation.mark-pin-relation",
            res[0].id,
            {
              fields: ["*"],
            }
          );
          c[index] = Object.assign(entries[index], {
            setX: pin.setX,
            setY: pin.setY,
          });
        } else {
          c[index] = entries[index];
        }
      }
      return c;
    } else {
      const entries = await strapi.entityService.findMany(
        "api::image-marking-product.image-marking-product",
        {
          locale: params.get("locale"),
          populate: {
            image_marking_images: {
              fields: ["*"],
            },
            product_image: {
              fields: ["*"],
            },
          },
          sort: "id:desc",
        }
      );
      const c = [];
      for (let index = 0; index < entries.length; index++) {
        const res = await strapi.entityService.findMany(
          "api::mark-pin-relation.mark-pin-relation",
          {
            fields: ["*"],
            filters: {
              image_marking_image: parseInt(params.get("imgid")),
              image_marking_product: entries[index].id,
            },
          }
        );

        if (res.length > 0) {
          const pin = await strapi.entityService.findOne(
            "api::mark-pin-relation.mark-pin-relation",
            res[0].id,
            {
              fields: ["*"],
            }
          );
          c[index] = Object.assign(entries[index], {
            setX: pin.setX,
            setY: pin.setY,
          });
        } else {
          c[index] = entries[index];
        }
      }
      return c;
    }
  },
});
