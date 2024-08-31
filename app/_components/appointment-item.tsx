import { Prisma } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarImage } from "./ui/avatar"
import { format, isFuture } from "date-fns"

interface AppointmentItemProps {
  appointment: Prisma.BookingGetPayload<{
    include: { service: { include: { barbershop: true } } }
  }>
}

export function AppointmentItem({ appointment }: AppointmentItemProps) {
  const { name, imageUrl } = appointment.service.barbershop
  const isConfirmed = isFuture(appointment.date)

  return (
    <>
      <Card className="min-w-[90%]">
        <CardContent className="flex justify-between p-0">
          {/* LEFT */}
          <div className="flex flex-col gap-2 py-5 pl-5">
            <Badge
              className="w-fit"
              variant={isConfirmed ? "default" : "secondary"}
            >
              {isConfirmed ? "Confirmed" : "Completed"}
            </Badge>
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
            <p className="text-sm">{format(appointment.date, "HH:mm a")}</p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
