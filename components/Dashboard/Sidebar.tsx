"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const router = usePathname();

  const activeLink =
    "block p-2 rounded hover:bg-yellow-500 bg-yellow-500 font-bold";
  const nonActiveLink = "block p-2 rounded";

  const sidebarVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
    closed: {
      opacity: 0,
      x: "-100%",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <>
      <motion.div 
      variants={sidebarVariants}
      initial={true}
      animate={showSidebar ? "open" : "closed"}
      className={`w-[10rem] md:hidden ${!showSidebar ? "max-sm:hidden" : "max-sm:block" }`}
      >
        <div className="p-4">
          <motion.div
            whileHover={{ scale: 1.2 }}
            onHoverStart={(e) => {}}
            onHoverEnd={(e) => {}}
          >
            <h1 className="text-xl font-bold mb-4">
              Reyvin <span className="text-sky-400">Store</span>
            </h1>
          </motion.div>
          <hr className="my-3 sm:mx-auto border-gray-500 lg:my-4 opacity-20" />
          <ul className="space-y-2">
            <li>
              <motion.div
                whileHover={{ scale: 1.2 }}
                onHoverStart={(e) => {}}
                onHoverEnd={(e) => {}}
              >
                <Link
                  href={"/dashboard/admin"}
                  className={
                    router === "/dashboard/admin" ? activeLink : nonActiveLink
                  }
                >
                  Home
                </Link>
              </motion.div>
            </li>
            <li>
              <motion.div
                whileHover={{ scale: 1.2 }}
                onHoverStart={(e) => {}}
                onHoverEnd={(e) => {}}
              >
                <Link
                  href={"/dashboard/admin/carousel"}
                  className={
                    router === "/dashboard/admin/carousel"
                      ? activeLink
                      : nonActiveLink
                  }
                >
                  Carousel
                </Link>
              </motion.div>
            </li>
          </ul>
        </div>
      </motion.div>
      <button className="px-2 hover:bg-yellow-500 rounded-md md:hidden" onClick={toggleSidebar}>
        {showSidebar ? <FaArrowLeft /> : <FaArrowRight />}
      </button>

      <motion.div 
      variants={sidebarVariants}
      className="w-[10rem]"
      >
        <div className="p-4">
          <motion.div
            whileHover={{ scale: 1.2 }}
            onHoverStart={(e) => {}}
            onHoverEnd={(e) => {}}
          >
            <h1 className="text-xl font-bold mb-4">
              Reyvin <span className="text-sky-400">Store</span>
            </h1>
          </motion.div>
          <hr className="my-3 sm:mx-auto border-gray-500 lg:my-4 opacity-20" />
          <ul className="space-y-2">
            <li>
              <motion.div
                whileHover={{ scale: 1.2 }}
                onHoverStart={(e) => {}}
                onHoverEnd={(e) => {}}
              >
                <Link
                  href={"/dashboard/admin"}
                  className={
                    router === "/dashboard/admin" ? activeLink : nonActiveLink
                  }
                >
                  Home
                </Link>
              </motion.div>
            </li>
            <li>
              <motion.div
                whileHover={{ scale: 1.2 }}
                onHoverStart={(e) => {}}
                onHoverEnd={(e) => {}}
              >
                <Link
                  href={"/dashboard/admin/carousel"}
                  className={
                    router === "/dashboard/admin/carousel"
                      ? activeLink
                      : nonActiveLink
                  }
                >
                  Carousel
                </Link>
              </motion.div>
            </li>
          </ul>
        </div>
      </motion.div>
      <button className="px-2 hover:bg-yellow-500 rounded-md md:hidden" onClick={toggleSidebar}>
        {showSidebar ? <FaArrowLeft /> : <FaArrowRight />}
      </button>
    </>
  );
}

export default Sidebar;