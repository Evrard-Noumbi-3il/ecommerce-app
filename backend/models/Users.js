import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String, 
      
    },
    firstname: {
      type: String, 
      
    },
    phonenumber: {
      type: String,
      
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
