import { SearchIcon } from "lucide-react"
import { Header } from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"
import { Avatar, AvatarImage } from "./_components/ui/avatar"
import { db } from "./_lib/prisma"
import { BarbershopItem } from "./_components/barbershop-item"

export default async function Home() {
  const barbershops = await db.barbershop.findMany({})

  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  return (
    <div>
      <Header />
      <div className="p-5">
        {/* TEXT */}
        <h2 className="text-xl font-bold">Hello, John!</h2>
        <p>Sunday, August 11.</p>

        {/* SEARCH */}
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Start your search..." />
          <Button>
            <SearchIcon />
          </Button>
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
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Appointments
        </h2>

        <Card>
          <CardContent className="flex justify-between p-0">
            {/* LEFT */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit">Confirmed</Badge>
              <h3 className="font-semibold">Haircut</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png" />
                </Avatar>
                <p className="text-sm">Vintage Barbershop</p>
              </div>
            </div>
            {/* RIGHT */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm">August</p>
              <p className="text-2xl">11</p>
              <p className="text-sm">4:30 pm</p>
            </div>
          </CardContent>
        </Card>

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
