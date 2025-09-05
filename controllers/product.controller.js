const Category = require("../models/category.model");
const productmodel = require("../models/product.model")

//create product
const createproduct = async (req,res) => {
    try{
    const  {name,price, category, ...others} = req.body
    //check if category exists 
    const iscategory = await Category.findById(category);
    if (!iscategory) {
        return res.status(404).json({message:"Category not found"})
    }

    const newproduct = new productmodel({name,price,category, ...others})
    const savedproduct = await newproduct.save();
    return res.status(201).json({savedproduct});
} catch(error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong"});
}
}  ;

//getallproduct
const getproduct = async(req,res) => {
    const allproduct  = await productmodel.find().populate("category","name")
     return res.status(200).json(allproduct);
    };

//updateproduct
const updateproduct = async (req, res) => {
    try {
    const {id} = req.params;
    const updatedproduct = await productmodel.findByIdAndUpdate(id,req.body,{new:true})
    return res.status(200).json({ message: "product updated", updatedproduct });
} catch (error) {
    console.error(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

  //deleteproduct
const deleteproduct = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedproduct = await productmodel.findByIdAndDelete(id);
      return res.status(200) .json({ message: "product deleted", deletedproduct });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "something went wrong" });
    }

};

  module.exports = { createproduct,getproduct,updateproduct,deleteproduct };