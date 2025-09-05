const usermodel = require("../models/user.model");
const bcrypt = require("bcryptjs");

//Register a user
const createuser = async (req, res) => {
  //get client details
  const { name, email, password, ...others } = req.body;

  //check if the user exists already in the database
  const isuser = await usermodel.findOne({ email });
  if (isuser) {
    return res
      .status(400)
      .json({ message: "User already exists, please login" });
  }

  //creating a hashed password
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(password, salt);

  //continue registration
  try {
    const newuser = new usermodel({
      name,
      email,
      password: hashpassword,
      ...others,
    });
    const saveduser = await newuser.save();
    return res.status(201).json({ message: "saveduser" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

//To login a user
const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //checking if username is in database
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }

    //comparing password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Wrong password" });
    }
    //return basic information
    return res.status(200).json({ message: "login succesful", id: user.id, name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!!" });
  }
};

// get all users
const getuser = async (req, res) => {
  const allUsers = await usermodel.find();
  return res.status(200).json(allUsers);
};

//updateuser
const updateuser = async (req, res) => {
  try {
    const { id, password, ...others } = req.body;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(password, salt);
      others.password = hashpassword;
    }
    const updateduser = await usermodel.findByIdAndUpdate(
      id,
      { ...others },
      { new: true }
    );
    return res.status(200).json({ message: "userupdated", updateduser});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

//deleteuser
const deleteuser = async (req, res) => {
  try {
    const { id } = req.body;
    const deleteduser = await usermodel.findByIdAndDelete(id);
    return res.status(200).json({ message: "deleteduser", deleteduser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

module.exports = { createuser, loginuser, getuser, updateuser, deleteuser };
