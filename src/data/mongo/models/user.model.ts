import mongoose from "mongoose";

export enum UserRoles {
  ADMIN_ROLE = "ADMIN_ROLE",
  USER_ROLE = "USER_ROLE",
}

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email needs to be unique"],
  },
  isEmailValidated: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  img: {
    type: String,
  },
  role: {
    type: [String],
    default: [UserRoles.USER_ROLE],
    enum: [UserRoles.ADMIN_ROLE, UserRoles.USER_ROLE],
  },
});

export const UserModel = mongoose.model("user", UserSchema);
