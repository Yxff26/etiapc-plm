import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import AccompanimentModel from '@/models/Accompaniment'
import User from '@/models/user'
import { connectDB } from '@/lib/db/mongodb'

export async function GET() {
  try {
    await connectDB()
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Buscar el coordinador por email
    const coordinator = await User.findOne({ email: session.user.email })
    if (!coordinator) {
      return NextResponse.json({ error: 'Coordinator not found' }, { status: 404 })
    }

    console.log("Coordinator ID:", coordinator._id) // Para debug

    // Obtener total de profesores
    const totalTeachers = await User.countDocuments({ role: 'teacher' })

    // Obtener total de acompañamientos realizados por este coordinador
    const completedAccompaniments = await AccompanimentModel.countDocuments({ 
      coordinador: coordinator._id
    })

    console.log("Total accompaniments:", completedAccompaniments) // Para debug

    return NextResponse.json({
      teachers: totalTeachers,
      completedAccompaniments
    })
  } catch (error) {
    console.error('Error fetching coordinator statistics:', error)
    return NextResponse.json(
      { error: 'Error al obtener las estadísticas' },
      { status: 500 }
    )
  }
} 