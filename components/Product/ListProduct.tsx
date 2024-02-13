"use client";
import { Categories, Product } from "@prisma/client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

interface IProduct extends Product {
  category: Categories & { name: string };
}

interface IProducts {
  product: IProduct[];
  title: string
}

const ListProduct = ({ product, title }: IProducts) => {
  if (product.length === 0) {
    return ""
  }
  return (
    <section>
      <hr className="my-6 sm:mx-auto border-gray-500 lg:my-4 opacity-30" />
      <h1 className="mb-3 font-semibold text-xl">{title}</h1>
      <Swiper
        modules={[FreeMode]}
        // spaceBetween={8}
        grabCursor={true}
        freeMode={true}
        breakpoints={{
          300: {
            slidesPerView: 3.4,
            spaceBetween: 10,
          },
          700: {
            slidesPerView: 6,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 10,
            spaceBetween: 15,
          },
        }}
      >
        {product.map((prod) => (
          <SwiperSlide key={prod.id}>
            <div>
            <Link href={`/product/${prod.name}`}>
                <div className="rounded-lg shadow-md max-sm:h-44 sm:h-60 md:h-48 border border-yellow-500 md:w-2/3 lg:w-full max-sm:w-full">
                  <Image
                    className="rounded-lg lg:h-[100px] md:h-24"
                    src={prod.image}
                    width={700}
                    height={700}
                    alt={prod.name}
                  />
                  <div className="md:p-3 max-md:py-2">
                    <h1 className="md:text-md max-md:text-xs max-md:font-semibold max-md:font-sans text-center">
                      {prod.name}
                    </h1>
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ListProduct;
