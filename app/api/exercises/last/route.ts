import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Workout } from "@/models/Workout"

export async function GET(req: Request) {

  await connectDB()

  const { searchParams } = new URL(req.url)

  const exercise = searchParams.get("exercise")
  const userId = searchParams.get("userId")

  if (!exercise || !userId) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 })
  }

  const workouts = await Workout.find({
    userId
  }).sort({ date: -1 })

  for (const w of workouts) {

    const ex = w.exercises.find((e: any) => e.name === exercise)

    if (ex) {

      const bestSet = ex.sets.reduce((best: any, s: any) => {

        if (!best) return s

        if (s.weight > best.weight) return s

        if (s.weight === best.weight && s.reps > best.reps) return s

        return best

      }, null)

      return NextResponse.json({
        weight: bestSet.weight,
        reps: bestSet.reps
      })

    }

  }

  return NextResponse.json(null)

}