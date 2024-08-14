"use client"

import { SmartphoneIcon } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"

interface PhoneItemProps {
  phone: string
}
export default function PhoneItem({ phone }: PhoneItemProps) {
  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone)
    toast.success("Phone number copied!")
  }

  return (
    <div className="flex justify-between">
      {/* LEFT */}
      <div className="flex items-center gap-2">
        <SmartphoneIcon />
        <p className="text-sm">{phone}</p>
      </div>
      {/* RIGHT */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleCopyPhone(phone)}
      >
        Copy
      </Button>
    </div>
  )
}
