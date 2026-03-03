import mongoose, { Types, Schema } from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required_: [true, "Name is required."],
  },
  isAvailable: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    defalut: 0,
  },
  description: {
    type: String,
    required: [true, "Description is required."],
  },
  user: {
    type: Types.ObjectId,
    ref: "user",
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
});

export const ProductModel = mongoose.model("product", ProductSchema);
