"use client"

type Set = {
  weight: number
  reps: number
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

  return (
    <div className="bg-gray-800 p-4 rounded mb-6">

      <h2 className="text-xl font-bold mb-4">
        {name}
      </h2>

      {/* encabezado */}

      <div className="flex gap-4 text-sm text-gray-400 mb-2 ml-20">
        <span className="w-28">kg</span>
        <span className="w-28">reps</span>
      </div>

      {sets.map((set, i) => (

        <div
          key={i}
          className="flex items-center gap-4 mb-3"
        >

          <span className="w-20 text-gray-300">
            Serie {i + 1}
          </span>

          <input
            type="number"
            value={set.weight}
            onChange={(e) =>
              updateSet(
                name,
                i,
                "weight",
                Number(e.target.value)
              )
            }
            className="w-28 px-3 py-3 rounded bg-white text-black text-lg"
          />

          <input
            type="number"
            value={set.reps}
            onChange={(e) =>
              updateSet(
                name,
                i,
                "reps",
                Number(e.target.value)
              )
            }
            className="w-28 px-3 py-3 rounded bg-white text-black text-lg"
          />

        </div>

      ))}

    </div>
  )
}