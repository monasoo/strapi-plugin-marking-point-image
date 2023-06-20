'use strict';
const config = require("../config");

module.exports = ({ strapi }) => ({

  async getConfig() {
    return await strapi.config.get("plugin.marking-point-image", config.default)
  },

  async getLocales() {
    const locales = await strapi.plugin("i18n").service("locales").find()
    const defaultLocale = await strapi.plugin("i18n").service("locales").getDefaultLocale()
    return locales.map(locale => ({ ...locale, isDefault: (locale.code === defaultLocale) }))
  },
});