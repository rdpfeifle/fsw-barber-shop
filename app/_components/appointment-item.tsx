import { Prisma } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarImage } from "./ui/avatar"
import { format, isFuture } from "date-fns"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import { ConfirmationTag } from "./confirmation-tag"
import PhoneItem from "./phone-item"

interface AppointmentItemProps {
  appointment: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

export function AppointmentItem({ appointment }: AppointmentItemProps) {
  const { name, imageUrl, address, phones } = appointment.service.barbershop
  const { date } = appointment
  const isConfirmed = isFuture(appointment.date)

  return (
    <Sheet>
      <SheetTrigger className="w-full">
        <Card className="min-w-[90%]">
          <CardContent className="flex justify-between p-0">
            {/* LEFT */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <ConfirmationTag isConfirmed={isConfirmed} />
              <h3 className="font-semibold">{appointment.service.name}</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={imageUrl} />
                </Avatar>
                <p className="text-sm">{name}</p>
              </div>
            </div>
            {/* RIGHT */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm capitalize">
                {format(appointment.date, "MMM")}
              </p>
              <p className="text-2xl">{format(appointment.date, "dd")}</p>
              <p className="text-sm">{format(appointment.date, "hh:mm a")}</p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="w-[85%]">
        <SheetHeader>
          <SheetTitle>Appointment Details</SheetTitle>
        </SheetHeader>
        <div className="relative mt-6 flex h-[180px] w-full items-end">
          <Image
            alt={`Map of${name} Barbershop`}
            src="/map.png"
            className="rounded-xl object-cover"
            fill
          />

          <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
            <CardContent className="flex items-center gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage src={imageUrl} />
              </Avatar>
              <div className="">
                <h3 className="font-bold">{name}</h3>
                <p className="text-xs">{address}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <ConfirmationTag isConfirmed={isConfirmed} />

          {/* TODO: create component for this, also used in ServiceItem */}
          <Card className="mb-6 mt-3">
            <CardContent className="space-y-3 p-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">{name}</h2>
                <p className="text-sm font-bold">
                  {Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(Number(appointment.service.price))}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Date</h2>
                <p className="text-sm">{format(date, "E, MMMM d, y")}</p>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Time</h2>
                <p className="text-sm">{format(date, "hh:mm a")}</p>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Barbershop</h2>
                <p className="text-sm">{name}</p>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-3">
            {phones.map((phone) => (
              <PhoneItem key={phone} phone={phone} />
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
