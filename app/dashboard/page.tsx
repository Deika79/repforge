"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type User = {
  _id: string
  name: string
}

export default function Dashboard() {

  const router = useRouter()

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {

    const userId = localStorage.getItem("userId")

    if (!userId) {
      router.push("/")
      return
    }

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
        Cargando...
      </main>
    )

  }

  return (

    <main className="min-h-screen bg-gray-900 text-white p-6">

      <h1 className="text-3xl font-bold mb-10 text-center">
        {user.name}
      </h1>

      <div className="flex flex-col gap-6 max-w-md mx-auto">

        <button
          onClick={() => router.push("/workout/new")}
          className="bg-green-600 py-5 rounded text-xl"
        >
          Nuevo entrenamiento
        </button>

        <button
          onClick={() => router.push("/history")}
          className="bg-blue-600 py-5 rounded text-xl"
        >
          Historial
        </button>

        <button
          onClick={() => router.push("/stats")}
          className="bg-purple-600 py-5 rounded text-xl"
        >
          Estadísticas
        </button>

      </div>

    </main>

  )

}