const express = require('express')
const{
      createorder,
      getuserorder,
      getadminorder,
      updateorderstatus,
    }  = require("../controllers/orders.controllers")



    const route = express.Router()
    route.post("/createorder" ,createorder)

     route.get("/admin/orders", getadminorder);

    route.get("/user/:userId", getuserorder);
  
    //admin routes
   
    route.patch("/admin/:orderId/status", updateorderstatus);

    module.exports = route