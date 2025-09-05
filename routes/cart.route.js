const express = require("express")
const{createcart,
    getcart,
     updatecart, 
     removefromcart,
      clearcart} = require("../controllers/cart.controller")


const route = express.Router();
route.get("/:userId",getcart);

route.post("/createcart", createcart);

route.put("/updatecart", updatecart);

route.delete("/:userId/items/:productId", removefromcart);

route.delete("/:userId", clearcart);

      module.exports = route;

