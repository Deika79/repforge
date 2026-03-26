"use client"

import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts"

import { estimate1RM } from "@/utils/strength"
import BackButton from "@/components/BackButton"

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
  // Agrupar por tipo
  // -------------------------

  function volumeByType(type: string) {

    return workouts
      .filter((w) => w.workoutType === type)
      .map((w) => ({
        date: new Date(w.date).toLocaleDateString(),
        volume: calculateVolume(w.exercises)
      }))
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
  // 1RM estimado
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

  const prs = getPRsPerUser()
  const best1RM = getBest1RM()

  return (

    <main className="min-h-screen bg-gray-900 text-white p-6">

      {/* 🔙 botón atrás */}
      <BackButton />

      <h1 className="text-3xl font-bold mb-10">
        Estadísticas
      </h1>

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
      {/* 1RM */}
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
      {/* GRÁFICAS POR TIPO */}
      {/* ---------------- */}

      {["push", "pull", "legs"].map((type) => {

        const data = volumeByType(type)

        return (

          <div key={type} className="mb-10">

            <h2 className="text-xl font-bold mb-4 capitalize">
              Progresión {type}
            </h2>

            <div className="w-full h-64 bg-gray-800 p-2 rounded">

              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>

                  <CartesianGrid stroke="#444" />

                  <XAxis dataKey="date" />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="volume"
                    stroke="#22c55e"
                  />

                </LineChart>
              </ResponsiveContainer>

            </div>

          </div>

        )

      })}

    </main>

  )

}