'use strict';

const myController = require('./plugin');
const category = require("./category");
const images = require("./images");
const product = require("./product");
const pin = require("./pin");
const api = require("./api");

module.exports = {
  "myController": myController,
  "category": category,
  "images": images,
  "product": product,
  "pin": pin,
  "api": api,
};
