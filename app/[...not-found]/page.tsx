import NotFound from "@/components/NotFound/NotFound";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `404 Not found - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  manifest: "/manifest.json",
};

export default function NotFoundCatchAll() {

  return (
    <>
    <NotFound />
    </>
  );
}