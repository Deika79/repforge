"use client"

import { useRouter } from "next/navigation"

export default function WorkoutComplete() {

  const router = useRouter()

  const volume = localStorage.getItem("lastVolume")
  const exercises = localStorage.getItem("lastExercises")

  return (

    <main className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center justify-center text-center">

      <h1 className="text-3xl font-bold mb-6">
        Entrenamiento completado ✅
      </h1>

      <div className="mb-6">

        <div className="text-lg mb-2">
          Volumen: {volume} kg
        </div>

        <div className="text-lg">
          Ejercicios: {exercises}
        </div>

      </div>

      <button
        onClick={() => router.push("/dashboard")}
        className="bg-green-600 px-6 py-3 rounded text-lg"
      >
        Volver al dashboard
      </button>

    </main>

  )
}