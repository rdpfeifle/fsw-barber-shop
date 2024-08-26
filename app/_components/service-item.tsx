"use client"

import { Barbershop, BarbershopService } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { useState } from "react"
import { format, set } from "date-fns"
import { createAppointments } from "../_actions/create-appointments"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { TIME_SLOTS } from "../_constants/timeSlots"

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, "name">
}

export function ServiceItem({ service, barbershop }: ServiceItemProps) {
  const { data } = useSession()

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )

  const handleDateSelection = (date: Date | undefined) => {
    setSelectedDate(date)
  }

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time)
  }

  const handleCreateAppointment = async () => {
    try {
      if (!selectedDate || !selectedTime) return

      const [hours, minutes] = selectedTime?.split(":")

      const newAppointment = set(selectedDate, {
        minutes: +minutes,
        hours: +hours,
      })

      await createAppointments({
        userId: (data?.user as any).id,
        serviceId: service.id,
        date: newAppointment,
      })

      toast.success("Your appointment has been successfully created.")
    } catch (error) {
      console.error("Error: ", error)
      toast.error(
        "There was an error creating your appointment. Please try again.",
      )
    }
  }

  const convertTo12HourFormat = (selectedDate: Date, time: string) => {
    if (!selectedDate) return time

    const [hours, minutes] = time.split(":")
    const newDate = set(selectedDate, { hours: +hours, minutes: +minutes })

    return format(newDate, "hh:mm a")
  }

  return (
    <>
      <Card>
        <CardContent className="flex items-center gap-3 p-3">
          {/* IMAGE */}
          <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
            <Image
              alt={service.name}
              src={service.imageUrl}
              className="rounded-lg object-cover"
              fill
            />
          </div>
          {/* INFO */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">{service.name}</h3>
            <p className="text-sm text-gray-400">{service.description}</p>
            {/* PRICE AND BUTTON */}
            <div className="flex items-center justify-between">
              <p className="font-fold text-sm text-primary">
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(Number(service.price))}
              </p>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="secondary" size="sm">
                    Book Now
                  </Button>
                </SheetTrigger>
                <SheetContent className="p-0">
                  <SheetHeader className="pt-5">
                    <SheetTitle>Schedule your Appointment</SheetTitle>
                  </SheetHeader>

                  <div className="border-b border-solid py-5">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelection}
                      styles={{
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                        cell: {
                          width: "100%",
                        },
                        button: {
                          width: "100%",
                        },
                        nav_button_previous: {
                          width: "32px",
                          height: "32px",
                        },
                        nav_button_next: {
                          width: "32px",
                          height: "32px",
                        },
                        caption: {
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </div>
                  {selectedDate && (
                    <div className="flex gap-3 overflow-x-auto border-b border-solid p-5 [&::-webkit-scrollbar]:hidden">
                      {TIME_SLOTS.map((time) => (
                        <Button
                          key={time}
                          variant={
                            selectedTime === time ? "default" : "outline"
                          }
                          className="rounded-full"
                          onClick={() => handleTimeSelection(time)}
                        >
                          {convertTo12HourFormat(selectedDate, time)}
                        </Button>
                      ))}
                    </div>
                  )}
                  {selectedTime && selectedDate && (
                    <div className="p-5">
                      <Card>
                        <CardContent className="space-y-3 p-3">
                          <div className="flex items-center justify-between">
                            <h2 className="font-bold">{service.name}</h2>
                            <p className="text-sm font-bold">
                              {Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                              }).format(Number(service.price))}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">Date</h2>
                            <p className="text-sm">
                              {format(selectedDate, "EEEE, MMMM d, y")}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">Time</h2>
                            <p className="text-sm">
                              {convertTo12HourFormat(
                                selectedDate,
                                selectedTime,
                              )}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">
                              Barbershop
                            </h2>
                            <p className="text-sm">{barbershop.name}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                  <SheetFooter className="mt-5 px-5">
                    <SheetClose asChild>
                      <Button
                        type="submit"
                        disabled={!selectedDate || !selectedTime}
                        onClick={handleCreateAppointment}
                      >
                        Confirm
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
