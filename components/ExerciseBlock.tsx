"use client"

import { useState } from "react"

type Props = {
  name: string
  setsCount: number
}

export default function ExerciseBlock({ name, setsCount }: Props) {

  const [sets, setSets] = useState(
    Array.from({ length: setsCount }, () => ({
      weight: "",
      reps: ""
    }))
  )

  function updateSet(index: number, field: string, value: string) {
    const newSets = [...sets]
    newSets[index] = { ...newSets[index], [field]: value }
    setSets(newSets)
  }

  return (
    <div className="bg-gray-800 p-4 rounded mb-6">

      <h2 className="text-xl font-bold mb-3">{name}</h2>

      {sets.map((set, i) => (
        <div key={i} className="flex gap-3 mb-2">

          <span className="w-20">Serie {i + 1}</span>

          <input
            placeholder="kg"
            value={set.weight}
            onChange={(e) => updateSet(i, "weight", e.target.value)}
            className="w-24 px-2 py-1 rounded bg-white text-black"
          />

          <input
            placeholder="reps"
            value={set.reps}
            onChange={(e) => updateSet(i, "reps", e.target.value)}
            className="w-24 px-2 py-1 rounded bg-white text-black"
          />

        </div>
      ))}

    </div>
  )
}