import Admin from "@/components/Dashboard/Admin"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `Home Dashboard - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  description: 'Home Dashboard Admin ReyinStore',
  manifest: "/manifest.json",
}

const page = () => {
  return <Admin />
}

export default page