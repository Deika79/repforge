import Image from "next/image"
import UserSelector from "@/components/UserSelector"

export default function Home() {

  return (
    <main className="min-h-screen bg-gray-900 text-white">

      {/* HERO */}

      <div className="relative h-[40vh] w-full">

        <Image
          src="/gym.jpg"
          alt="gym"
          fill
          className="object-cover opacity-60"
        />

        <div className="absolute inset-0 flex items-center justify-center">

          <h1 className="text-5xl font-bold tracking-wide">
            RepForge
          </h1>

        </div>

      </div>

      {/* USER SELECTOR */}

      <div className="p-6">

        <UserSelector />

      </div>

    </main>
  )
}