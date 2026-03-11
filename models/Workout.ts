import mongoose, { Schema, models, model } from "mongoose"

const SetSchema = new Schema({
  weight: Number,
  reps: Number,
  rir: Number,
})

const WorkoutExerciseSchema = new Schema({
  exerciseId: {
    type: Schema.Types.ObjectId,
    ref: "Exercise",
  },
  name: String,
  sets: [SetSchema],
})

const WorkoutSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    workoutType: {
      type: String,
      enum: ["push", "pull", "legs"],
    },

    exercises: [WorkoutExerciseSchema],
  },
  {
    timestamps: true,
  }
)

export const Workout =
  models.Workout || model("Workout", WorkoutSchema)