"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"

export const deleteAppointment = async (bookingId: string) => {
  await db.booking.delete({
    where: {
      id: bookingId,
    },
  })
  revalidatePath("/appointments")
}
