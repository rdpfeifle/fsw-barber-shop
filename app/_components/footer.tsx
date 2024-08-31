import { Card, CardContent } from "./ui/card"

export function Footer() {
  return (
    <footer>
      <Card>
        <CardContent className="px-5 py-6">
          <p className="text-sm text-gray-400">
            {" "}
            © 2023 Copyright <span className="font-bold">TrimHub</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}
