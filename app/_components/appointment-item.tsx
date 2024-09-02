"use client"

import { Prisma } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarImage } from "./ui/avatar"
import { format, isFuture } from "date-fns"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import { ConfirmationTag } from "./confirmation-tag"
import PhoneItem from "./phone-item"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { deleteAppointment } from "../_actions/delete-appointment"
import { toast } from "sonner"
import { AppointmentSummary } from "./appointment-summary"

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
  const isConfirmed = isFuture(appointment.date)

  const handleCancelAppointment = async () => {
    try {
      await deleteAppointment(appointment.id)
      toast.success("Your reservation has been canceled.")
    } catch (e) {
      console.error(
        "A problem occurred while trying to delete the appointment...",
        e,
      )
      toast.error("Cancellation failed. Please try again.")
    }
  }

  return (
    <Sheet>
      <SheetTrigger className="w-full min-w-[90%]">
        <Card>
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
          <div className="mb-3 mt-6">
            <AppointmentSummary
              service={appointment.service}
              barbershop={appointment.service.barbershop}
              selectedDate={appointment.date}
            />
          </div>

          <div className="space-y-3">
            {phones.map((phone) => (
              <PhoneItem key={phone} phone={phone} />
            ))}
          </div>
        </div>
        <SheetFooter className="mt-6">
          <div className="flex items-center gap-3">
            <SheetClose asChild>
              <Button variant="outline" className="w-full">
                Back
              </Button>
            </SheetClose>

            {isConfirmed && (
              <Dialog>
                <DialogTrigger className="w-full">
                  <Button variant="destructive" className="w-full">
                    Cancel Reservation
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[90%] py-10">
                  <DialogHeader>
                    <DialogTitle>
                      Do you want to cancel your reservation?
                    </DialogTitle>
                    <DialogDescription>
                      This action is irreversible. By canceling, you will lose
                      your reservation and will not be able to recover it.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex flex-row gap-3">
                    <DialogClose asChild>
                      <Button variant="secondary" className="w-full">
                        Back
                      </Button>
                    </DialogClose>
                    <DialogClose className="w-full" asChild>
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={handleCancelAppointment}
                      >
                        Cancel Reservation
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
