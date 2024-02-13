import Login from "@/components/Auth/Login"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `Login - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  description: 'Login Page ReyinStore',
  manifest: "/manifest.json",
}

const page = () => {
  return <Login />
}

export default page