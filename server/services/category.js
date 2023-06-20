'use strict';
const config = require("../config");

module.exports = ({ strapi }) => ({
    
    async create(data) {
        //return await strapi.entityService.create("plugin::marking-point-image.markingimagecategory", data);
        return await strapi.entityService.create("api::image-marking-category.image-marking-category", data);
    },
    async find(query) {
        return await strapi.entityService.findMany("api::image-marking-category.image-marking-category", Object.assign(query, {
            populate: { category_image: {
                fields: ['*']
            } },
            sort: "id:desc"
        }))
    },

});