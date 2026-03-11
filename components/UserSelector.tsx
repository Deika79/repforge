"use client"

import { useEffect, useState } from "react"

type User = {
  _id: string
  name: string
}

export default function UserSelector() {
  const [users, setUsers] = useState<User[]>([])
  const [newUser, setNewUser] = useState("")

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    const res = await fetch("/api/users")
    const data = await res.json()
    setUsers(data)
  }

  async function createUser() {
  if (!newUser) return

  const res = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newUser,
      height: null,
      weight: null,
    }),
  })

  const data = await res.json()
  console.log("USER CREATED:", data)

  setNewUser("")
  fetchUsers()
}

  function selectUser(id: string) {
  localStorage.setItem("userId", id)
  window.location.href = "/dashboard"
}

  return (
    <div className="max-w-md mx-auto mt-10 text-center">
      <h1 className="text-3xl font-bold mb-6">Seleccionar usuario</h1>

      <div className="space-y-3 mb-6">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => selectUser(user._id)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            {user.name}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          placeholder="Nuevo usuario"
          className="flex-1 border px-3 py-2 rounded bg-white text-black"
        />

        <button
          onClick={createUser}
          className="bg-green-600 text-white px-4 rounded"
        >
          +
        </button>
      </div>
    </div>
  )
}