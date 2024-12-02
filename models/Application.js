import mongoose, { Schema, model } from "mongoose";

const ApplicationSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    website: {
      type: String
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Application = model("Application", ApplicationSchema);

export default Application;
