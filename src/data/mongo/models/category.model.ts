import mongoose, { Schema, Types } from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  isAvailable: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

export const CategoryModel = mongoose.model("category", CategorySchema);
