const express = require("express");
const {createuser, 
    loginuser, 
    getuser, 
    updateuser, 
    deleteuser} = require("../controllers/user.controller")

    const route = express.Router()
    route.get( "/", getuser)

     route.post( "/register", createuser)
    
      route.post( "/login", loginuser)
       route.put( "/update", updateuser)

        route.delete( "/delete", deleteuser)

    module.exports = route