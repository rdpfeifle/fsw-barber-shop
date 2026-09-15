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
      <div className="mx-auto w-full max-w-6xl space-y-3 p-5 lg:px-8 lg:py-8">
        <h1 className="text-xl font-bold lg:text-2xl">Appointments</h1>
        {confirmedAppointments.length === 0 &&
          pastAppointments.length === 0 && (
            <p>You haven&apos;t made any appointments yet.</p>
          )}
        {confirmedAppointments.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Confirmed
            </h2>
            <div className="space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 lg:grid-cols-3">
              {confirmedAppointments.map((appointment) => (
                <AppointmentItem
                  key={appointment.id}
                  appointment={JSON.parse(JSON.stringify(appointment))}
                />
              ))}
            </div>
          </>
        )}
        {pastAppointments.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Past
            </h2>
            <div className="space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 lg:grid-cols-3">
              {pastAppointments.map((appointment) => (
                <AppointmentItem
                  key={appointment.id}
                  appointment={JSON.parse(JSON.stringify(appointment))}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}
