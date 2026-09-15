import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Sidebar } from "./sidebar"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <Card>
      <CardContent className="mx-auto flex w-full max-w-6xl flex-row items-center justify-between p-5 lg:px-8">
        <Link href="/">
          <Image alt="FSW Barber" src="/logo.svg" height={18} width={120} />
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <Sidebar />
        </Sheet>
      </CardContent>
    </Card>
  )
}
