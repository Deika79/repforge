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
  userId: string
  workoutType: string
  date: string
  exercises: Exercise[]
}

type User = {
  _id: string
  name: string
}

export default function Stats() {

  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {

    fetch("/api/workouts")
      .then((res) => res.json())
      .then(setWorkouts)

    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers)

  }, [])

  function calculateVolume(exercises: Exercise[]) {

    let total = 0

    exercises.forEach((ex) => {
      ex.sets.forEach((s) => {
        total += s.weight * s.reps
      })
    })

    return total
  }

  function volumePerUser() {

    const volumes: Record<string, number> = {}

    workouts.forEach((w) => {

      const volume = calculateVolume(w.exercises)

      volumes[w.userId] = (volumes[w.userId] || 0) + volume

    })

    return volumes
  }

  function getPRs() {

    const prs: Record<string, number> = {}

    workouts.forEach((w) => {

      w.exercises.forEach((ex) => {

        ex.sets.forEach((s) => {

          if (!prs[ex.name] || s.weight > prs[ex.name]) {

            prs[ex.name] = s.weight

          }

        })

      })

    })

    return prs
  }

  const volumes = volumePerUser()
  const prs = getPRs()

  return (

    <main className="min-h-screen bg-gray-900 text-white p-6">

      <h1 className="text-3xl font-bold mb-8">
        Estadísticas
      </h1>

      {/* Volumen por usuario */}

      <div className="mb-10">

        <h2 className="text-xl font-bold mb-4">
          Volumen total por usuario
        </h2>

        {users.map((u) => (

          <div key={u._id} className="mb-2">

            {u.name}: {volumes[u._id] || 0} kg

          </div>

        ))}

      </div>

      {/* PR por ejercicio */}

      <div>

        <h2 className="text-xl font-bold mb-4">
          PR por ejercicio
        </h2>

        {Object.entries(prs).map(([exercise, weight]) => (

          <div key={exercise} className="mb-2">

            {exercise}: {weight} kg

          </div>

        ))}

      </div>

    </main>
  )
}