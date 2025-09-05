const mongoose = require("mongoose");

const productschema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref : "Category",
    required:true
  },
  stock: {
    type: Number,
    default: 0
  },
 },
  {timestamps:true}
);

const productmodel = mongoose.model("product", productschema);

module.exports = productmodel