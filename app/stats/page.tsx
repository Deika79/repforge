"use client"

import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts"

import { estimate1RM } from "@/utils/strength"

type Set = {
  weight: number
  reps: number
  rir?: number
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

  // -------------------------
  // Volumen total por usuario
  // -------------------------

  function volumePerUser() {

    const volumes: Record<string, number> = {}

    workouts.forEach((w) => {

      const volume = calculateVolume(w.exercises)

      volumes[w.userId] = (volumes[w.userId] || 0) + volume

    })

    return volumes

  }

  // -------------------------
  // PR por usuario
  // -------------------------

  function getPRsPerUser() {

    const prs: Record<string, Record<string, number>> = {}

    workouts.forEach((w) => {

      if (!prs[w.userId]) prs[w.userId] = {}

      w.exercises.forEach((ex) => {

        ex.sets.forEach((s) => {

          if (
            !prs[w.userId][ex.name] ||
            s.weight > prs[w.userId][ex.name]
          ) {

            prs[w.userId][ex.name] = s.weight

          }

        })

      })

    })

    return prs

  }

  // -------------------------
  // Estimación 1RM
  // -------------------------

  function getBest1RM() {

    const best: Record<string, number> = {}

    workouts.forEach((w) => {

      w.exercises.forEach((ex) => {

        ex.sets.forEach((s) => {

          const rm = estimate1RM(s.weight, s.reps)

          if (!best[ex.name] || rm > best[ex.name]) {
            best[ex.name] = rm
          }

        })

      })

    })

    return best

  }

  // -------------------------
  // Volumen semanal
  // -------------------------

  function weeklyVolume() {

    const weeks: Record<string, number> = {}

    workouts.forEach((w) => {

      const date = new Date(w.date)

      const week = `${date.getFullYear()}-${Math.ceil(date.getDate() / 7)}`

      const volume = calculateVolume(w.exercises)

      weeks[week] = (weeks[week] || 0) + volume

    })

    return Object.entries(weeks).map(([week, volume]) => ({
      week,
      volume
    }))

  }

  const volumes = volumePerUser()
  const prs = getPRsPerUser()
  const weekly = weeklyVolume()
  const best1RM = getBest1RM()

  return (

    <main className="min-h-screen bg-gray-900 text-white p-6">

      <h1 className="text-3xl font-bold mb-10">
        Estadísticas
      </h1>

      {/* ---------------- */}
      {/* Volumen total */}
      {/* ---------------- */}

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

      {/* ---------------- */}
      {/* PR por usuario */}
      {/* ---------------- */}

      <div className="mb-10">

        <h2 className="text-xl font-bold mb-4">
          PR por usuario
        </h2>

        {users.map((u) => (

          <div key={u._id} className="mb-6">

            <div className="font-semibold mb-2">
              {u.name}
            </div>

            {prs[u._id] &&
              Object.entries(prs[u._id]).map(([ex, w]) => (

                <div key={ex} className="text-sm">

                  {ex}: {w} kg

                </div>

              ))}

          </div>

        ))}

      </div>

      {/* ---------------- */}
      {/* Estimación 1RM */}
      {/* ---------------- */}

      <div className="mb-10">

        <h2 className="text-xl font-bold mb-4">
          Estimación 1RM
        </h2>

        {Object.entries(best1RM).map(([ex, rm]) => (

          <div key={ex}>

            {ex}: {rm} kg

          </div>

        ))}

      </div>

      {/* ---------------- */}
      {/* Volumen semanal */}
      {/* ---------------- */}

      <div>

        <h2 className="text-xl font-bold mb-4">
          Progresión volumen semanal
        </h2>

        <LineChart width={600} height={300} data={weekly}>

          <CartesianGrid stroke="#444" />

          <XAxis dataKey="week" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="volume"
            stroke="#22c55e"
          />

        </LineChart>

      </div>

    </main>

  )

}