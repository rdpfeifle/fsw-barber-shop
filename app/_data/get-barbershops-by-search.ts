"use server"

import { BarbershopsPageProps } from "../_types/barbershopTypes"
import { db } from "../_lib/prisma"

export const getBarbershopsBySearch = async ({
  searchParams = {},
}: BarbershopsPageProps) => {
  return db.barbershop.findMany({
    where: {
      OR: [
        searchParams?.title
          ? {
              name: {
                contains: searchParams?.title,
                mode: "insensitive",
              },
            }
          : {},
        searchParams.service
          ? {
              services: {
                some: {
                  name: {
                    contains: searchParams.service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  })
}
