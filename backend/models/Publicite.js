import mongoose from "mongoose";

const publiciteSchema = new mongoose.Schema({
  titre: String,
  information: String,
  image: String 
});

export default mongoose.model("Publicite", publiciteSchema);