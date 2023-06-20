// Strapi
import { request } from "@strapi/helper-plugin";

const apiRequests = {
  getConfig: async () => {
    return await request(`/marking-point-image/config`, {
      method: "GET",
    });
  },
  getLocales: async () => {
    return await request(`/marking-point-image/locales`, {
      method: "GET",
    });
  },
  getImageList: async (locale = null, filter = null) => {
    console.log(filter); // ${filter ? `&filters=${filter}` : ""}
    return await request(
      `/marking-point-image/images/find${locale ? `?locale=${locale}` : ""}${filter ? `&filters=${filter}` : ""
      }`,
      {
        method: "GET",
      }
    );
  },
  createCategory: async (data) => {
    return await request(`/marking-point-image/category/create`, {
      method: "POST",
      body: { data: data },
    });
  },
  getCategories: async (locale = null) => {
    return await request(
      `/marking-point-image/category/find${locale ? `?locale=${locale}` : ""}`,
      {
        method: "GET",
      }
    );
  },
  getProdInCate: async (locale = null, img = null) => {
    return await request(
      `/marking-point-image/product/find${
        locale ? `?locale=${locale}&img=${img}` : ""
      }`,
      {
        method: "GET",
      }
    );
  },
  createPinOnImage: async (id, data) => {
    return await request(`/marking-point-image/product/createpin/${id}`, {
      method: "PUT",
      body: { data: data },
    });
  },
  getXY: async (imgID = null, ProdID = null) => {
    return await request(
      `/marking-point-image/pin/find${
        imgID ? `?img=${imgID}&prod=${ProdID}` : ""
      }`,
      {
        method: "GET",
      }
    );
  },
};

export default apiRequests;
