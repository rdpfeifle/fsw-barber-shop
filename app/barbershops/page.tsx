import { BarbershopsPageProps } from "../_types/barbershopTypes"
import { getBarbershopsBySearch } from "../_data/get-barbershops-by-search"
import { BarbershopItem } from "../_components/barbershop-item"
import { Header } from "../_components/header"
import { Search } from "../_components/search"

async function BarbershopsPage({ searchParams }: BarbershopsPageProps) {
  const barbershops = await getBarbershopsBySearch({ searchParams })

  return (
    <div>
      <Header />
      <div className="mx-auto w-full max-w-6xl px-5 lg:px-8">
        <div className="my-6 lg:max-w-xl">
          <Search />
        </div>
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Results for &quot;{searchParams?.title || searchParams?.service}&quot;
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarbershopsPage
