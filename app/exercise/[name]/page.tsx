"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts"
import BackButton from "@/components/BackButton"

type Set = {
  weight: number
  reps: number
}

type Exercise = {
  name: string
  sets: Set[]
}

type Workout = {
  date: string
  exercises: Exercise[]
}

export default function ExercisePage() {

  const params = useParams()

  const exerciseName = decodeURIComponent(params.name as string)

  const [data, setData] = useState<any[]>([])

  useEffect(() => {

    fetch("/api/workouts")
      .then((res) => res.json())
      .then((workouts: Workout[]) => {

        const progress: any[] = []

        workouts.forEach((w) => {

          const exercise = w.exercises.find(
            (ex) => ex.name === exerciseName
          )

          if (!exercise) return

          const maxWeight = Math.max(
            ...exercise.sets.map((s) => s.weight)
          )

          progress.push({
            date: new Date(w.date).toLocaleDateString(),
            weight: maxWeight
          })

        })

        setData(progress)

      })

  }, [exerciseName])

  return (

    <main className="min-h-screen bg-gray-900 text-white p-6">

      {/* 🔙 botón atrás */}
      <BackButton />

      <h1 className="text-3xl font-bold mb-6">
        {exerciseName}
      </h1>

      <div className="w-full h-64 bg-gray-800 p-2 rounded">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid stroke="#444" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="weight"
              stroke="#22c55e"
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </main>

  )
}