"use client"

import { useEffect, useState } from "react"

type User = {
  _id: string
  name: string
}

export default function Dashboard() {

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {

    const userId = localStorage.getItem("userId")

    if (!userId) return

    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {

        const found = data.find((u: User) => u._id === userId)

        setUser(found)
      })

  }, [])

  if (!user) {

    return (
      <main className="min-h-screen flex items-center justify-center text-white bg-gray-900">
        Cargando usuario...
      </main>
    )
  }

  return (

    <main className="min-h-screen bg-gray-900 text-white p-6">

      <h1 className="text-3xl font-bold mb-8">
        Dashboard - {user.name}
      </h1>

      <div className="space-y-4 max-w-md">

        <button
          onClick={() => window.location.href="/workout/new"}
          className="w-full bg-green-600 py-3 rounded"
        >
          Nuevo entrenamiento
        </button>

        <button
          onClick={() => window.location.href="/history"}
          className="w-full bg-blue-600 py-3 rounded"
        >
          Ver historial
        </button>

        <button
          onClick={() => window.location.href="/stats"}
          className="w-full bg-purple-600 py-3 rounded"
        >
          Estadísticas
        </button>

      </div>

    </main>

  )
}