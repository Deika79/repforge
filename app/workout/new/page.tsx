"use client"

import { useState } from "react"
import ExerciseBlock from "@/components/ExerciseBlock"
import { workoutTemplates } from "@/utils/workoutTemplates"

export default function NewWorkout() {

  const [type, setType] = useState("push")

  const template =
    workoutTemplates[type as keyof typeof workoutTemplates]

  const [exercisesData, setExercisesData] = useState(() => {
    const obj: any = {}

    template.forEach((ex) => {
      obj[ex.name] = Array.from({ length: ex.sets }, () => ({
        weight: 0,
        reps: 0
      }))
    })

    return obj
  })

  function updateSet(exercise: string, index: number, field: string, value: number) {

    const updated = { ...exercisesData }

    updated[exercise][index][field] = value

    setExercisesData(updated)
  }

  function calculateVolume() {

    let total = 0

    Object.values(exercisesData).forEach((sets: any) => {
      sets.forEach((s: any) => {
        total += s.weight * s.reps
      })
    })

    return total
  }

  async function saveWorkout() {

    const userId = localStorage.getItem("userId")

    const exercises = Object.keys(exercisesData).map((name) => ({
      name,
      sets: exercisesData[name]
    }))

    const res = await fetch("/api/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId,
        workoutType: type,
        date: new Date(),
        exercises
      })
    })

    const data = await res.json()

    console.log("WORKOUT SAVED:", data)

    alert("Entrenamiento guardado")
  }

  const volume = calculateVolume()

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6 overflow-y-auto">

      <h1 className="text-3xl font-bold mb-6">
        Nuevo entrenamiento
      </h1>

      <div className="mb-6">
        <p className="mb-2">Tipo de entrenamiento</p>

        <div className="flex gap-3">

          <button
            onClick={() => setType("push")}
            className={`px-4 py-2 rounded ${type==="push" ? "bg-green-600" : "bg-gray-700"}`}
          >
            Push
          </button>

          <button
            onClick={() => setType("pull")}
            className={`px-4 py-2 rounded ${type==="pull" ? "bg-green-600" : "bg-gray-700"}`}
          >
            Pull
          </button>

          <button
            onClick={() => setType("legs")}
            className={`px-4 py-2 rounded ${type==="legs" ? "bg-green-600" : "bg-gray-700"}`}
          >
            Legs
          </button>

        </div>
      </div>

      {template.map((ex) => (

        <ExerciseBlock
          key={ex.name}
          name={ex.name}
          sets={exercisesData[ex.name]}
          updateSet={updateSet}
        />

      ))}

      <div className="mt-6 text-lg font-bold">
        Volumen total: {volume} kg
      </div>

      <button
        onClick={saveWorkout}
        className="mt-6 bg-green-600 px-6 py-3 rounded"
      >
        Guardar entrenamiento
      </button>

    </main>
  )
}