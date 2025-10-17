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
    role: {
      type: String,
      enum: ["user", "moderator", "admin"],
      default: "user"
    },
    favoris: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Produits"
    }],
    misEnVente: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Produits"
    }],
    avis: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Avis"
    }],
    photo: {
      type: String,
      default: "/images/default-profile.png",
    },
    adresse: {
      rue: String,
      ville: String,
      codePostal: String,
      pays: String
    },
    isBan: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
