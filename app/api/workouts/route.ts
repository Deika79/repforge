import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Workout } from "@/models/Workout"

export async function POST(req: Request) {

  await connectDB()

  const body = await req.json()

  const workout = await Workout.create(body)

  return NextResponse.json(workout)
}