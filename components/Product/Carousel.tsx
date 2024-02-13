"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";
import "swiper/css/effect-fade";
import "swiper/css";
import { motion } from "framer-motion";
import axios from "axios";

export default function Carousel() {
  const [carousel, setCarousel] = useState([]);

  const getCarousel = async () => {
    const response = await axios.get("/api/v1/carousel");
    const data = response.data.carousel;
    setCarousel(data);
  };

  useEffect(() => {
    getCarousel();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  if(carousel.length === 0) {
    return ""
  }

  return (
    <>
      <Swiper
        modules={[Autoplay, EffectFade]}
        spaceBetween={3}
        loop={true}
        grabCursor={true}
        speed={1000}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
          700: {
            slidesPerView: 1.2,
          },
          1024: {
            slidesPerView: 1,
          },
        }}
        className="rounded-lg shadow-2xl md:w-1/2 sm:w-full"
      >
        {carousel.map((item: any, index: number) => (
              <SwiperSlide key={index}>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex justify-center items-center"
                >
                  <Image
                    src={item?.image}
                    alt=""
                    width={700}
                    height={700}
                    objectFit="cover"
                    priority
                    className="rounded-md lg:h-64 max-sm:h-40 md:h-64 w-full"
                  />
                </motion.div>
              </SwiperSlide>
            ))}
      </Swiper>
    </>
  );
}
