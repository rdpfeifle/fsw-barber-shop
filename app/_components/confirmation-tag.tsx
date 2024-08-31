import { Badge } from "./ui/badge"

interface ConfirmationTagProp {
  isConfirmed: boolean
}

export function ConfirmationTag({ isConfirmed }: ConfirmationTagProp) {
  return (
    <Badge className="w-fit" variant={isConfirmed ? "default" : "secondary"}>
      {isConfirmed ? "Confirmed" : "Completed"}
    </Badge>
  )
}
