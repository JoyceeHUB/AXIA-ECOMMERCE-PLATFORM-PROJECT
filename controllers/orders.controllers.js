const ordermodel = require("../models/order.model")
const cartmodel = require("../models/cart.model")

//creating order 
const createorder = async (req,res) =>{
    try{
        const { userId } = req.body
        //find the order
        const cart = await cartmodel.findOne({ user: userId })
          .populate
          ({path: "products.product", 
            model: "product",
           select:  "name price"});

           if (!cart || cart.products.length === 0) {
             return res
               .status(404)
               .json({ message: "Cart not found or empty" });
           }

          //calculate total price
          let totalprice = 0;
          cart.products.forEach(item => {
            totalprice += item.product.price * item.quantity;
          });

          //create new order
          const neworder = new ordermodel ({
        user: userId,
        products: cart.products.map(p=> ({
            product: p.product._id,
            quantity: p.quantity
        })
        ),
        totalprice,
          });
           const savedorder = await neworder.save();
          //clear cart
          await cartmodel.deleteOne ({_id: cart._id});
          return res.status(201).json({message: "Order placed successfully", order:savedorder})
    }catch(error){
        console.error(error);
        return res.status(500).json({message:"Something went wrong"});
    };
    }

    // get orders for a user
    const getuserorder = async (req, res) => {
      try {
        const { userId } = req.params;
        const orders = await ordermodel.find({ user: userId }).populate(
          "products.product",
          "name price"
        )
          .sort({createdAt: -1});
      if (!orders || orders.length === 0) {
             return res .status(404).json({message: "Order not found or empty"});
           }
        return res.status(200).json(orders);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
      }
    };

    // admin: get all orders
    const getadminorder = async (req, res) => {
      try {
        const orders = await ordermodel.find()
          .populate("user", "name email")
          .populate("products.product", "name price")
          .sort({createdAt: -1});

        return res.status(200).json(orders);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
      }
    };

    // update order status (admin only)
    const updateorderstatus = async (req, res) => {
      try {
        const { orderId } = req.params;
        const { status } = req.body;

        //validate status
        const allowed = ["pending","order processing","shipped","delivered","cancelled"];
        if(!allowed.includes(status)){
            return res.status(400).json({message: "Invalid status"})
        }

        const order = await ordermodel.findById(orderId);
        if (!order){ 
            return res.status(404).json({ message: "Orders not found" });
         }

        order.status = status;
        const updatedOrder = await order.save();
        return res.status(200).json({ message: "Order updated", order: updatedOrder });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
      }
    };

    module.exports = {
      createorder,
      getuserorder,
      getadminorder,
      updateorderstatus,
    };