"use client"

import { useState, useEffect } from "react"
import ExerciseBlock from "@/components/ExerciseBlock"
import { workoutTemplates } from "@/utils/workoutTemplates"
import BackButton from "@/components/BackButton"

export default function NewWorkout() {

  const [type, setType] = useState("push")

  const template =
    workoutTemplates[type as keyof typeof workoutTemplates]

  const [exercisesData, setExercisesData] = useState<any>({})

  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  // reconstruir ejercicios cuando cambie el tipo
  useEffect(() => {

    const obj: any = {}

    template.forEach((ex) => {

      obj[ex.name] = Array.from({ length: ex.sets }, () => ({
        weight: 0,
        reps: 0,
        rir: 0
      }))

    })

    setExercisesData(obj)

  }, [type])

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

    if (saving || saved) return

    setSaving(true)

    const userId = localStorage.getItem("userId")

    const exercises = Object.keys(exercisesData).map((name) => ({
      name,
      sets: exercisesData[name]
    }))

    await fetch("/api/workouts", {
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

    setSaving(false)
    setSaved(true)

    // redirige automáticamente al dashboard
    setTimeout(() => {
      window.location.href = "/dashboard"
    }, 1500)

  }

  const volume = calculateVolume()

  return (

    <main className="min-h-screen bg-gray-900 text-white p-6 overflow-y-auto">

      <BackButton />

      <h1 className="text-3xl font-bold mb-6">
        Nuevo entrenamiento
      </h1>

      {/* selector tipo */}

      <div className="mb-6">

        <p className="mb-2">Tipo de entrenamiento</p>

        <div className="flex gap-3">

          <button
            onClick={() => setType("push")}
            className={`px-4 py-2 rounded ${
              type === "push" ? "bg-green-600" : "bg-gray-700"
            }`}
          >
            Push
          </button>

          <button
            onClick={() => setType("pull")}
            className={`px-4 py-2 rounded ${
              type === "pull" ? "bg-green-600" : "bg-gray-700"
            }`}
          >
            Pull
          </button>

          <button
            onClick={() => setType("legs")}
            className={`px-4 py-2 rounded ${
              type === "legs" ? "bg-green-600" : "bg-gray-700"
            }`}
          >
            Legs
          </button>

        </div>

      </div>

      {/* ejercicios */}

      {template.map((ex) => (

        <ExerciseBlock
          key={ex.name}
          name={ex.name}
          sets={exercisesData[ex.name] || []}
          updateSet={updateSet}
        />

      ))}

      <div className="mt-6 text-lg font-bold">
        Volumen total: {volume} kg
      </div>

      {/* botón PRO */}

      <button
        onClick={saveWorkout}
        disabled={saving}
        className={`mt-6 px-6 py-3 rounded w-full text-lg ${
          saving
            ? "bg-gray-600"
            : saved
            ? "bg-green-800"
            : "bg-green-600"
        }`}
      >
        {saving
          ? "Guardando..."
          : saved
          ? "Guardado ✅"
          : "Guardar entrenamiento"}
      </button>

    </main>

  )

}