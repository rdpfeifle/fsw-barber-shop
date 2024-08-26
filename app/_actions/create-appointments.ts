"use server"

import { db } from "../_lib/prisma"

interface CreateAppointmentParams {
  userId: string
  serviceId: string
  date: Date
}
export const createAppointments = async (params: CreateAppointmentParams) => {
  await db.booking.create({
    data: params,
  })
}
