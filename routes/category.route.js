const express = require("express");
const {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

const route = express.Router();
route.get("/category", getCategory);

route.post("/createcategory", createCategory);

route.put("/updatecategory/:Id", updateCategory);

route.delete("/deletecategory/:Id", deleteCategory);

module.exports = route;
