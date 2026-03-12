"use client"

import { useState } from "react"
import ExerciseBlock from "@/components/ExerciseBlock"
import { workoutTemplates } from "@/utils/workoutTemplates"

export default function NewWorkout() {

  const [type, setType] = useState("push")

  const exercises =
    workoutTemplates[type as keyof typeof workoutTemplates]

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">

      <h1 className="text-3xl font-bold mb-6">
        Nuevo entrenamiento
      </h1>

      {/* Selector tipo entrenamiento */}

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

      {/* Lista de ejercicios según rutina */}

      <div className="mt-6">

        {exercises.map((ex, i) => (
          <ExerciseBlock
            key={i}
            name={ex.name}
            setsCount={ex.sets}
          />
        ))}

      </div>

      {/* Botón guardar (aún no guarda en DB) */}

      <button className="mt-6 bg-green-600 px-6 py-3 rounded">
        Guardar entrenamiento
      </button>

    </main>
  )
}