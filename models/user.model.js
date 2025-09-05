const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim:true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  admin: {
    type: String,
    required: true 
  }},
{timestamps : true }
);

const usermodel = mongoose.model("User", userschema);

module.exports = usermodel;