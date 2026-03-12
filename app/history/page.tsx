"use client"

import { useEffect, useState } from "react"

type Set = {
  weight: number
  reps: number
}

type Exercise = {
  name: string
  sets: Set[]
}

type Workout = {
  _id: string
  workoutType: string
  date: string
  exercises: Exercise[]
}

export default function History() {

  const [workouts, setWorkouts] = useState<Workout[]>([])

  useEffect(() => {
    fetchWorkouts()
  }, [])

  async function fetchWorkouts() {

    const res = await fetch("/api/workouts")

    const data = await res.json()

    setWorkouts(data)
  }

  function calculateVolume(exercises: Exercise[]) {

    let total = 0

    exercises.forEach((ex) => {
      ex.sets.forEach((set) => {
        total += set.weight * set.reps
      })
    })

    return total
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">

      <h1 className="text-3xl font-bold mb-8">
        Historial de entrenamientos
      </h1>

      {workouts.map((w) => {

        const volume = calculateVolume(w.exercises)

        return (

          <div key={w._id} className="bg-gray-800 p-4 rounded mb-6">

            <div className="flex justify-between mb-4">

              <span className="font-bold uppercase">
                {w.workoutType}
              </span>

              <span>
                {new Date(w.date).toLocaleDateString()}
              </span>

            </div>

            <div className="text-sm mb-3">
              Volumen total: {volume} kg
            </div>

            {w.exercises.map((ex, i) => (

              <div key={i} className="mb-3">

            <a
              href={`/exercise/${encodeURIComponent(ex.name)}`}
              className="font-semibold text-green-400"
            >
              {ex.name}
            </a>

                {ex.sets.map((s, j) => (

                  <div key={j} className="text-sm text-gray-300">

                    {s.weight} kg × {s.reps}

                  </div>

                ))}

              </div>

            ))}

          </div>

        )

      })}

    </main>
  )
}