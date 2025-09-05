const mongoose = require ("mongoose")

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    products:[
        {product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
        },
        quantity:{
            type:Number, 
            required: true,
            min: 1,
        },
       }
      ],
      totalprice:{
        type: Number,
        required:true
      },
      status:{
        type:String,
        enum: ["pending","order processing","shipped","delivered","cancelled"],
        default: "pending"
      }
    },
    {timestamps: true}
    )


const ordermodel = mongoose.model("order", orderSchema)

module.exports = ordermodel