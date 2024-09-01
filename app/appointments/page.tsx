import { getServerSession } from "next-auth"
import { Header } from "../_components/header"
import { authOptions } from "../_lib/auth"
import { notFound } from "next/navigation"
import { AppointmentItem } from "../_components/appointment-item"
import { getConfirmedAppointments } from "../_data/get-confirmed-appointments"
import { getPastAppointments } from "../_data/get-past-appointments"

export default async function Appointments() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return notFound() // TODO: display login pop-up

  const confirmedAppointments = await getConfirmedAppointments()
  const pastAppointments = await getPastAppointments()

  return (
    <>
      <Header />
      <div className="space-y-3 p-5">
        <h1 className="text-xl font-bold">Appointments</h1>
        {confirmedAppointments.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Confirmed
            </h2>
            {confirmedAppointments.map((appointment) => (
              <AppointmentItem
                key={appointment.id}
                appointment={JSON.parse(JSON.stringify(appointment))}
              />
            ))}
          </>
        )}
        {pastAppointments.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Past
            </h2>
            {pastAppointments.map((appointment) => (
              <AppointmentItem
                key={appointment.id}
                appointment={JSON.parse(JSON.stringify(appointment))}
              />
            ))}
          </>
        )}
      </div>
    </>
  )
}
