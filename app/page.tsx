import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import { Header } from "./_components/header"
import { Button } from "./_components/ui/button"
import Image from "next/image"
import { db } from "./_lib/prisma"
import { BarbershopItem } from "./_components/barbershop-item"
import { quickSearchOptions } from "./_constants/search"
import { AppointmentItem } from "./_components/appointment-item"
import { Search } from "./_components/search"
import Link from "next/link"
import { getConfirmedAppointments } from "./_data/get-confirmed-appointments"
import { format } from "date-fns"

export default async function Home() {
  const session = await getServerSession(authOptions)

  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
  const confirmedAppointments = await getConfirmedAppointments()

  return (
    <div>
      <Header />
      <div className="p-5">
        {/* TEXT */}
        <h2 className="text-xl font-bold">
          {session?.user
            ? `Hello, ${session?.user.name?.split(" ")[0]}!`
            : "Welcome to TrimHub!"}
        </h2>
        <p>{format(new Date(), "EEEE, MMMM dd.")}</p>

        {/* SEARCH */}
        <div className="mt-6">
          <Search />
        </div>

        {/* QUICK SEARCH */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              className="gap-2"
              variant="secondary"
              key={option.title}
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  alt={option.title}
                  src={option.imageUrl}
                  width={16}
                  height={16}
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>

        {/* BANNER */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Book with the best at FSW Barber"
            src="/banner-01.png"
            className="rounded-xl object-cover"
            fill
          />
        </div>

        {/* APPOINTMENTS */}
        {confirmedAppointments.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Appointments
            </h2>
            <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {confirmedAppointments.map((appointment) => (
                <AppointmentItem
                  key={appointment.id}
                  appointment={JSON.parse(JSON.stringify(appointment))}
                />
              ))}
            </div>
          </>
        )}

        {/* RECOMMENDED */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recommended
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        {/* POPULAR */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Popular
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}
