import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarImage } from "./ui/avatar"

export function AppointmentItem() {
  return (
    <>
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
    </>
  )
}
