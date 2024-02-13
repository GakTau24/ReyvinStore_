"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lilita_One } from "next/font/google";

const font = Lilita_One({ subsets: ["latin"], weight: "400" });

export default function Footer() {
  const getTime = new Date().getFullYear();
  return (
    <footer className="rounded-lg shadow-xl m-4 relative">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="self-center text-2xl font-semibold whitespace-nowrap">
            <motion.div
              whileHover={{ scale: 1.2 }}
              onHoverStart={(e) => {}}
              onHoverEnd={(e) => {}}
              className="w-1/2">
              <Link href={"/"} className="flex">
                <h1 className={`${font.className} lg:text-2xl font-bold text-xl`}>Reyvin{" "}
                <span className="text-yellow-500">Store</span></h1>
              </Link>
            </motion.div>
          </div>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium">
            <li>
              <Link href={"/"} className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href={"/"} className="mr-4 hover:underline md:mr-6 ">
                Licensing
              </Link>
            </li>
            <li>
              <Link href={"/contact"} className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-smsm:text-center">
          © {getTime}{" "}
          <Link href={"/"} className="hover:underline">
            Reyvin Store™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}