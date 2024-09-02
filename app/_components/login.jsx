import { signIn } from "next-auth/react"
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import Image from "next/image"

export function LoginDialog() {
  const handleLoginWithGoogle = () => signIn("google")

  return (
    <>
      <DialogHeader>
        <DialogTitle>Log In</DialogTitle>
        <DialogDescription>Sign in with your Google account.</DialogDescription>
      </DialogHeader>
      <Button
        variant="outline"
        className="gap-2 font-bold"
        onClick={handleLoginWithGoogle}
      >
        <Image
          alt="Sign in with your Google account"
          src="/google.svg"
          width={18}
          height={18}
        />
        Google
      </Button>
    </>
  )
}
