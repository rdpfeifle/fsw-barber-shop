"use server"

import { BarbershopPageProps } from "../_types/barbershopTypes"
import { db } from "../_lib/prisma"

export const getBarbershopById = async ({ params }: BarbershopPageProps) => {
  if (!params.id) throw new Error("Barbershop id is required.")

  return db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })
}
