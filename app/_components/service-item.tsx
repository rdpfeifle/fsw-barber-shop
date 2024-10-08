"use client"

import { Barbershop, BarbershopService, Booking } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { useEffect, useMemo, useState } from "react"
import { isPast, isToday, set } from "date-fns"
import { createAppointments } from "../_actions/create-appointments"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { TIME_SLOTS } from "../_constants/timeSlots"
import { getAppointments } from "../_actions/get-appointments"
import { Dialog, DialogContent } from "./ui/dialog"
import { LoginDialog } from "./login"
import { convertTo12HourFormat } from "../_utils/dateUtils"
import { AppointmentSummary } from "./appointment-summary"
import { useRouter } from "next/navigation"

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, "name">
}

interface GetTimeSlotsProps {
  bookings: Booking[]
  selectedDate: Date
}

const getTimeSlots = ({ bookings, selectedDate }: GetTimeSlotsProps) => {
  return TIME_SLOTS.filter((time) => {
    const [hours, minutes] = time.split(":")

    const isTimeOnThePast = isPast(
      set(new Date(), { hours: +hours, minutes: +minutes }),
    )
    if (isTimeOnThePast && isToday(selectedDate)) return false

    const isTimeSlotBooked = bookings.some(
      (booking) =>
        booking.date.getHours() === +hours &&
        booking.date.getMinutes() === +minutes,
    )

    return !isTimeSlotBooked
  })
}

export function ServiceItem({ service, barbershop }: ServiceItemProps) {
  const { data } = useSession()
  const router = useRouter()
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )
  const [appointmentsDates, setAppointmentsDates] = useState<Booking[]>([])
  const [isAppointmentSheetOpen, setIsAppointmentSheetOpen] = useState(false)

  // try ReactQuery later on
  useEffect(() => {
    const fetch = async () => {
      if (!selectedDate) return
      const appointments = await getAppointments({
        serviceId: service.id,
        date: selectedDate,
      })
      setAppointmentsDates(appointments)
    }
    fetch()
  }, [selectedDate, service.id])

  const handleTimeSlotClick = () =>
    data?.user ? setIsAppointmentSheetOpen(true) : setIsLoginDialogOpen(true)

  const toggleAppointmentSlotsSheet = () => {
    setSelectedDate(undefined)
    setSelectedTime(undefined)
    setAppointmentsDates([])
    setIsAppointmentSheetOpen(false)
  }

  const handleDateSelection = (date: Date | undefined) => {
    setSelectedDate(date)
  }

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time)
  }

  const handleCreateAppointment = async () => {
    try {
      if (!selectedAppointment) return

      await createAppointments({
        serviceId: service.id,
        date: selectedAppointment,
      })
      toggleAppointmentSlotsSheet()
      toast.success("Your appointment has been successfully created.", {
        action: {
          label: "See appointments",
          onClick: () => router.push("/appointments"),
        },
      })
    } catch (error) {
      console.error("Error: ", error)
      toast.error(
        "There was an error creating your appointment. Please try again.",
      )
    }
  }

  const timeSlots = useMemo(() => {
    if (!selectedDate) return []
    return getTimeSlots({
      bookings: appointmentsDates,
      selectedDate,
    })
  }, [appointmentsDates, selectedDate])

  const selectedAppointment = useMemo(() => {
    if (!selectedDate || !selectedTime) return

    const [hours, minutes] = selectedTime?.split(":")

    return set(selectedDate, {
      hours: +hours,
      minutes: +minutes,
    })
  }, [selectedDate, selectedTime])

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

              <Sheet
                open={isAppointmentSheetOpen}
                onOpenChange={toggleAppointmentSlotsSheet}
              >
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleTimeSlotClick}
                >
                  Book Now
                </Button>
                <SheetContent className="p-0">
                  <SheetHeader className="pt-5">
                    <SheetTitle>Schedule your Appointment</SheetTitle>
                  </SheetHeader>

                  <div className="border-b border-solid py-5">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelection}
                      fromDate={new Date()}
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
                      {timeSlots.length > 0 ? (
                        timeSlots.map((time) => (
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
                        ))
                      ) : (
                        <p className="text-xs">No available time slots.</p>
                      )}
                    </div>
                  )}

                  {selectedAppointment && (
                    <div className="p-5">
                      <AppointmentSummary
                        service={service}
                        barbershop={barbershop}
                        selectedDate={selectedAppointment}
                      />
                    </div>
                  )}
                  <SheetFooter className="mt-5 px-5">
                    <Button
                      type="submit"
                      disabled={!selectedDate || !selectedTime}
                      onClick={handleCreateAppointment}
                    >
                      Confirm
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>
      <Dialog
        open={isLoginDialogOpen}
        onOpenChange={(open) => setIsLoginDialogOpen(open)}
      >
        <DialogContent className="w-[90%]">
          <LoginDialog />
        </DialogContent>
      </Dialog>
    </>
  )
}
