const express = require("express");
const userroute = require("./routes/user.route")
const productroute = require("./routes/product.route")
const categoryroute = require("./routes/category.route")
const cartroute = require("./routes/cart.route")
const orderroute = require("./routes/order.route")
const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()
const app = express();


//create connection to mongoose
mongoose
  .connect(process.env.Mongo_url)
  .then(() => console.log("Connected succesfully"))
  .catch(() => console.log("Error, something went wrong"));
  app.use(express.json());

  //creating  endpoints
  app.use(userroute);
  app.use(productroute);
  app.use(categoryroute);
  app.use(cartroute);
  app.use(orderroute);

app.get("/test", (req, res) => {
  res.send("Server is working!");
});
app.listen(3000,() => {
    console.log("App is litening on port 3000")
})