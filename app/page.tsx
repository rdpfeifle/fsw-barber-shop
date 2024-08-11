import { SearchIcon } from "lucide-react"
import { Header } from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"

export default function Home() {
  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Hello, John!</h2>
        <p>Sunday, August 11.</p>
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Start your search..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Book with the best at FSW Barber"
            src="/banner-01.png"
            className="rounded-xl object-cover"
            fill
          />
        </div>
      </div>
    </div>
  )
}
