const Category = require("../models/category.model");

// Create category
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const iscategory = await Category.findOne({ name });
    if (iscategory) {
      return res.status(400).json({ message: "Category already exists" });
    }
    const newCategory = new Category({ name, description });
    const savedcategory = await newCategory.save();
    return res.status(201).json(savedcategory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Get all categories
const getCategory = async (req, res) => {
  try {
    const allcategory = await Category.find();
    return res.status(200).json(allcategory);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Update category
const updateCategory = async (req, res) => {
  try {
    const {Id} = req.params;
    const updatedcategory = await Category.findByIdAndUpdate(Id, req.body, {new: true});
    return res.status(200).json({message: "Category created", updatedcategory});
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  try {
    const { Id } = req.params;
    const deletedcategory = await Category.findByIdAndDelete(Id);
    return res.status(200).json({ message: "Category deleted" , deletedcategory});
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
