import mongoose from "mongoose";

const avisSchema = new mongoose.Schema(
    {
        userSend:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true
        },
        userReceive:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true
        },
        note: {
            type : Number,
            required: true,
            min: 1,
            max: 5
        }
    },
    { timestamps: true }
);
export default mongoose.model("Avis", avisSchema);