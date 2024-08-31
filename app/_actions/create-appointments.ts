"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"

interface CreateAppointmentParams {
  serviceId: string
  date: Date
}
export const createAppointments = async (params: CreateAppointmentParams) => {
  const user = await getServerSession(authOptions)

  if (!user) throw new Error("User not authenticated")

  await db.booking.create({
    data: { ...params, userId: (user.user as any).id },
  })
  revalidatePath("/barbershops/[id]")
  revalidatePath("/appointments")
}
