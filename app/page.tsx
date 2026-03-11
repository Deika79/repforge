import UserSelector from "@/components/UserSelector"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-10">
        RepForge
      </h1>

      <UserSelector />
    </main>
  )
}