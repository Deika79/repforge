import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"

// GET - obtener todos los usuarios
export async function GET() {
  try {
    await connectDB()

    const users = await User.find()

    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching users" },
      { status: 500 }
    )
  }
}

// POST - crear usuario
export async function POST(req: Request) {
  try {
    await connectDB()

    const body = await req.json()

    const user = await User.create({
      name: body.name,
      height: body.height,
      weight: body.weight,
    })

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating user" },
      { status: 500 }
    )
  }
}