'use strict';

const myService = require('./my-service');
const Category = require("./category");
const Images = require("./images");
const Product = require("./products");
const Pin = require("./pin");
const Api = require("./api");

module.exports = {
  "myService": myService,
  "Category": Category,
  "Images": Images,
  "Product": Product,
  "Pin": Pin,
  "Api": Api,
};
