import { format, set } from "date-fns"

export const convertTo12HourFormat = (selectedDate: Date, time: string) => {
  if (!selectedDate) return time

  const [hours, minutes] = time.split(":")
  const newDate = set(selectedDate, { hours: +hours, minutes: +minutes })

  return format(newDate, "hh:mm a")
}
