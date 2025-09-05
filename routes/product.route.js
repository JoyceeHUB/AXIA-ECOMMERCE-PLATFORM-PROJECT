const express = require("express")
const { createproduct,
    getproduct,
    updateproduct,
    deleteproduct } = require("../controllers/product.controller")

    const route = express.Router()

    route.post ("/createproduct",createproduct)

    route.get ("/product",getproduct)

    route.put ("/updateproduct/:id",updateproduct)

    route.delete ("/deleteproduct/:id",deleteproduct)

    

    module.exports = route