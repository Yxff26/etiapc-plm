import { connectDB } from "@/lib/db/mongodb"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const mongoose = await connectDB()
    
    if (!mongoose.connection.db) {
      throw new Error("No database connection available")
    }

    const db = mongoose.connection.db
    const usersCollection = db.collection("users")
    
    if (!usersCollection) {
      throw new Error("Users collection not found")
    }

    const [totalUsers, teachers, coordinators, admins] = await Promise.all([
      usersCollection.countDocuments(),
      usersCollection.countDocuments({ role: "teacher" }),
      usersCollection.countDocuments({ role: "coordinator" }),
      usersCollection.countDocuments({ role: "administrator" })
    ])

    return NextResponse.json({
      totalUsers,
      teachers,
      coordinators,
      admins,
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json(
      { 
        error: "Error fetching stats",
        details: error instanceof Error ? error.message : "Unknown error"
      }, 
      { status: 500 }
    )
  }
} 