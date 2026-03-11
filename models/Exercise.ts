import mongoose, { Schema, models, model } from "mongoose"

const ExerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  muscleGroup: {
    type: String,
  },
})

export const Exercise =
  models.Exercise || model("Exercise", ExerciseSchema)