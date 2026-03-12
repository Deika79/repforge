import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Workout } from "@/models/Workout"

export async function POST() {

  await connectDB()

  await Workout.deleteMany({})

  return NextResponse.json({
    message: "Workouts reset"
  })
}