"use client"

type Set = {
  weight: number
  reps: number
}

type Props = {
  name: string
  sets: Set[]
  updateSet: (exercise: string, index: number, field: string, value: number) => void
}

export default function ExerciseBlock({ name, sets, updateSet }: Props) {

  return (
    <div className="bg-gray-800 p-4 rounded mb-6">

      <h2 className="text-xl font-bold mb-3">{name}</h2>

      {sets.map((set, i) => (

        <div key={i} className="flex gap-3 mb-2 items-center">

          <span className="w-20">Serie {i + 1}</span>

          <input
            type="number"
            placeholder="kg"
            value={set.weight}
            onChange={(e) =>
              updateSet(name, i, "weight", Number(e.target.value))
            }
            className="w-24 px-2 py-1 rounded bg-white text-black"
          />

          <input
            type="number"
            placeholder="reps"
            value={set.reps}
            onChange={(e) =>
              updateSet(name, i, "reps", Number(e.target.value))
            }
            className="w-24 px-2 py-1 rounded bg-white text-black"
          />

        </div>

      ))}

    </div>
  )
}