"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold max-md:px-4 mb-4">Contact Us</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-6">
          <div className=" shadow-2xl rounded p-10">
            <div className="flex justify-center mb-4">
              <Image
                src={"/assets/whatsapp.png"}
                width="100"
                height="100"
                layout="responsive"
                objectFit="contain"
                alt="Whatsapp"
                className="rounded-xl"
              />
            </div>
            <h1 className="text-lg font-bold text-center mb-4">WhatsApp</h1>
            <Link
              href={"https://wa.me/6285173125847"}
              >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              className="bg-green-500 hover:bg-green-600 rounded-lg text-white font-bold py-2 px-4 mt-4 inline-block"
              >
                Send Message
              </motion.div>
            </Link>
          </div>

          <div className="shadow-2xl rounded p-10">
            <div className="flex justify-center mb-4">
              <Image
                src={"/assets/messenger.png"}
                width="100"
                height="100"
                layout="responsive"
                objectFit="contain"
                alt="LINE"
                className="rounded-xl"
              />
            </div>
            <h1 className="text-lg font-bold text-center mb-4">
              Facebook Messenger
            </h1>
            <Link
              href={"https://m.me/calvnw"}
              >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-4 inline-block"
              >
                Send Message
              </motion.div>
            </Link>
          </div>

          <div className="shadow-2xl rounded p-10">
            <div className="flex justify-center mb-4">
              <Image
                src={"/assets/line.png"}
                width="100"
                height="100"
                layout="responsive"
                objectFit="contain"
                alt="LINE"
                className="rounded-xl"
              />
            </div>
            <h1 className="text-lg font-bold text-center mb-4">LINE</h1>
            <Link
              href={"https://line.me/ti/p/~calvnw"}
              >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              className="bg-yellow-500 hover:bg-yellow-600 justify-center text-white font-bold py-2 px-4 rounded-lg mt-4 inline-block"
              >
                Send Message
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Contact;