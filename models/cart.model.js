const mongoose = require("mongoose")

const cartschema = new mongoose.Schema ({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
},
products: [{
product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"product",
    required:true
},
quantity:{
    type:Number,
    required:true,
    default:1,
    min:1
},
}]
},
{timestamps: true}
)

const cartmodel = mongoose.model("cart",cartschema)
module.exports = cartmodel
