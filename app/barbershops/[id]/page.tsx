import { BarbershopPageProps } from "../../_types/barbershopTypes"
import PhoneItem from "@/app/_components/phone-item"
import { ServiceItem } from "@/app/_components/service-item"
import { Sidebar } from "@/app/_components/sidebar"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { getBarbershopById } from "@/app/_data/get-barbershop-by-id"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershop = await getBarbershopById({ params })

  if (!barbershop) {
    return notFound()
  }

  return (
    <div>
      {/* IMAGE */}
      <div className="relative h-[250px] w-full">
        <Image
          alt={barbershop?.name}
          src={barbershop?.imageUrl}
          className="object-cover"
          fill
        />
        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="absolute right-4 top-4"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <Sidebar />
        </Sheet>
      </div>
      {/* BARBERSHOP NAME, ADDRESS AND REVIEWS */}
      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">{barbershop?.name}</h1>
        <div className="mb-2 flex items-center gap-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop?.address}</p>
        </div>
        <div className="flex items-center gap-2">
          <StarIcon className="fill-primary text-primary" size={18} />
          <p className="text-sm">5.0 (200 reviews)</p>
        </div>
      </div>
      {/* DESCRIPTION */}
      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">About us</h2>
        <p className="text-justify text-sm">{barbershop?.description}</p>
      </div>
      {/* SERVICES */}
      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Services</h2>
        <div className="space-y-3">
          {barbershop.services.map((service) => (
            <ServiceItem
              key={service.id}
              service={JSON.parse(JSON.stringify(service))}
              barbershop={JSON.parse(JSON.stringify(barbershop))}
            />
          ))}
        </div>
      </div>
      {/* CONTACT */}
      <div className="space-y-3 p-5">
        {barbershop.phones.map((phone) => (
          <PhoneItem key={phone} phone={phone} />
        ))}
      </div>
    </div>
  )
}

export default BarbershopPage
