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

    const users = await usersCollection.find({}, {
      projection: {
        firstName: 1,
        lastName: 1,
        email: 1,
        role: 1,
        isEmailVerified: 1,
        loginAttempts: 1,
        createdAt: 1,
        googleProfileImage: 1,
        authProvider: 1
      }
    }).toArray()

    return NextResponse.json(users)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json(
      { 
        error: "Error fetching users",
        details: error instanceof Error ? error.message : "Unknown error"
      }, 
      { status: 500 }
    )
  }
} 