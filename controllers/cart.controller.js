const cartmodel = require("../models/cart.model");
const productmodel = require("../models/product.model");

//add product to cart
const createcart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    //check if the cart exists
    let cart = await cartmodel.findOne({ user: userId });
    if (!cart) {
      //create new one since it does not exist
      cart = new cartmodel({
        user: userId,
        products: [{ product: productId, quantity }],
      });
    } else {
      //check if product is already in cart
      const itemindex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );
      //here product is already here, so increase quantity
      if (itemindex > -1) {
        cart.products[itemindex].quantity += quantity;
        //if not add as new entry
      } else {
        cart.products.push({ product: productId, quantity });
      }
    }

    const savedcart = await cart.save();
    return res.status(200).json({ cart: savedcart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

//get cart for a user
const getcart = async (req, res) => {
  try {
    const { userId } = req.params;
    const allcart = await cartmodel
      .findOne({ user: userId })
      .populate({
        path: "products.product",
        model: "product",
        select : "name price"
      });
    if (!allcart) return res.status(404).json({ message: "cart not found" });
    return res.status(200).json(allcart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Update item quantity
const updatecart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const updatedcart = await cartmodel.findOne({ user: userId });
    if (!updatedcart)
      return res.status(404).json({ message: "Cart not found" });
    //check if product is in cart
    const idx = updatedcart.products.findIndex(
      (p) => p.product.toString() === productId
    );
    if (idx === -1)
      return res.status(404).json({ message: "Product not in cart" });
    if (quantity <= 0) {
      updatedcart.products.splice(idx, 1); // remove item
    } else {
      updatedcart.products[idx].quantity = quantity; // set to provided value
    }
    const updatedCart = await updatedcart.save();
    return res.status(200).json({ message: "Cart updated", cart: updatedCart });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// remove product from cart
const removefromcart = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    //check if cart exist
    const deletedcart = await cartmodel.findOne({ user: userId });
    if (!deletedcart) {
      return res.status(404).json({ message: "cart not found" });
    }

    deletedcart.products = deletedcart.products.filter(
      (p) => p.product.toString() !== productId
    );
    const updatedcart = await deletedcart.save();
    return res
      .status(200)
      .json({ message: "product removed", cart: updatedcart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

//delete a cart entirely
const clearcart = async (req, res) => {
  try {
    const { userId } = req.params;
    //check if cart exist
    const clearedcart = await cartmodel.findOneAndDelete({ user: userId });
    if (!clearedcart)
      return res.status(404).json({ message: "cart not found" });
    return res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { createcart, getcart, updatecart, removefromcart, clearcart };
