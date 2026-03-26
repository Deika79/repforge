"use client"

import { useEffect, useState } from "react"

type Set = {
  weight: number
  reps: number
  rir?: number
}

type Props = {
  name: string
  sets: Set[]
  updateSet: (
    exercise: string,
    index: number,
    field: string,
    value: number
  ) => void
}

export default function ExerciseBlock({
  name,
  sets,
  updateSet,
}: Props) {

  const [last, setLast] = useState<{weight:number,reps:number}|null>(null)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {

    const userId = localStorage.getItem("userId")
    if (!userId) return

    fetch(`/api/exercises/last?exercise=${encodeURIComponent(name)}&userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {

        if (!data) return

        setLast(data)

        // inicializar UNA VEZ
        if (!initialized) {

          sets.forEach((_, i) => {

            updateSet(name, i, "weight", 0)
            updateSet(name, i, "reps", 0)

          })

          setInitialized(true)
        }

      })

  }, [name])

  return (

    <div className="bg-gray-800 p-4 rounded mb-6">

      <h2 className="text-xl font-bold mb-2">
        {name}
      </h2>

      {last && (
        <div className="text-sm text-gray-400 mb-3">
          Última sesión: {last.weight} kg × {last.reps}
        </div>
      )}

      <div className="flex gap-4 text-sm text-gray-400 mb-2 ml-20">
        <span className="w-24">kg</span>
        <span className="w-24">reps</span>
        <span className="w-24">RIR</span>
      </div>

      {sets.map((set, i) => (

        <div
          key={i}
          className="flex items-center gap-4 mb-3"
        >

          <span className="w-20 text-gray-300">
            Serie {i + 1}
          </span>

          {/* PESO */}

          <input
            type="number"
            value={set.weight || ""}
            placeholder={last ? String(last.weight) : "kg"}
            onChange={(e) =>
              updateSet(
                name,
                i,
                "weight",
                Number(e.target.value)
              )
            }
            className="w-24 px-3 py-3 rounded bg-white text-black placeholder-gray-400"
          />

          {/* REPS */}

          <input
            type="number"
            value={set.reps || ""}
            placeholder={last ? String(last.reps) : "reps"}
            onChange={(e) =>
              updateSet(
                name,
                i,
                "reps",
                Number(e.target.value)
              )
            }
            className="w-24 px-3 py-3 rounded bg-white text-black placeholder-gray-400"
          />

          {/* RIR */}

          <input
            type="number"
            value={set.rir || ""}
            placeholder="rir"
            onChange={(e) =>
              updateSet(
                name,
                i,
                "rir",
                Number(e.target.value)
              )
            }
            className="w-24 px-3 py-3 rounded bg-white text-black placeholder-gray-400"
          />

        </div>

      ))}

    </div>

  )
}