const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: [true, "Please provide an name!"],
    unique: [true, "Email Exist"],
  },

  LastName: {
    type: String,
    required: [true, "Please provide an name!"]
  
  },

  password: {
    type: String,
    required: [true, "Please provide a password!"]
  },
 
  hall: {
    type: String,
    required: [true, "Please provide an hallName!"]
  },
  
  college: {
    type: String,
    required: [true, "Please provide an CollegeName!"]
 
  },
  phoneNumber: {
    type: String,
    required: [true, "Please provide an phoneNumber!"]
   
  },
  hallType: {
    type: String,
    required: [true, "Please provide an  hallType!"]
   
  },
  numberOfMembers: {
    type: String,
    required: [true, "Please provide an numberOfMembers!"]
    
  },
  audioSystem: {
    type: String,
    required: [true, "Please provide an  audioSystem!"]
 
  },
  gender: {
    type: String,
    required: [true, "Please provide an gender!"]
  
  },
  
  date: {
    type: String,
    required: [true, "Please provide an  date!"]
   
  },
  FromTime: {
    type: String,
    required: [true, "Please provide an  FromTime!"]
 
  },
  ToTime: {
    type: String,
    required: [true, "Please provide an ToTime!"]
   
  },
  GuestName:{
    type: String,
    required:[true,"please provide an GuestName!"]
  },
  
  GuestType:{
    type: String,
    required:[true,"please provide an GuestType!"]
  },
 }, {
    collection: 'users'
})

module.exports = mongoose.model("users", UserSchema);