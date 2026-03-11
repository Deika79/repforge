import mongoose, { Schema, models, model } from "mongoose"

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
)

export const User = models.User || model("User", UserSchema)