import { Metadata, ResolvingMetadata } from "next";
import { MetaProps } from "@/helper";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { BsWhatsapp } from "react-icons/bs";
import Handler from "@/components/Handler/Handler";

type Props = {
  params: { name: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

async function getDetailProduct(name: string) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL }/api/v1/product/detail/${name}`,
    { cache: "no-store" }
  );
  const response = await data.json()
  return response
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const name = params.name
  const { product } = await getDetailProduct(name);

  const previousImages = (await parent)?.openGraph?.images || [];

  if(!product) {
    return {
      ...Handler
    }
  }
    return {
      title: `${product.name} - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      openGraph: {
        images: [
          {
            url: product.image,
            alt: product.name,
          },
          ...previousImages,
        ],
        title: `${product.name} - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
        description: `Beli top-up game online dengan harga paling murah hanya di ${process.env.NEXT_PUBLIC_SITE_NAME}! Dapatkan harga spesial untuk top-up game seperti Mobile Legends, PUBG Mobile, Free Fire, Valorant, dan game online lainnya. tersedia dengan harga murah. Pesan sekarang dan nikmati pengalaman bermain game online yang lebih menyenangkan.`,
        url: process.env.NEXT_PUBLIC_BASE_URL,
      },
      description: `Beli top-up game online dengan harga paling murah hanya di ${process.env.NEXT_PUBLIC_SITE_NAME}! Dapatkan harga spesial untuk top-up game seperti Mobile Legends, PUBG Mobile, Free Fire, Valorant, dan game online lainnya. tersedia dengan harga murah. Pesan sekarang dan nikmati pengalaman bermain game online yang lebih menyenangkan.`,
      robots: {
        index: true,
        follow: true,
        nocache: true,
      },
      manifest: "/manifest.json",
      icons: "/reyvinstore.png",
      keywords: [
        `${process.env.NEXT_PUBLIC_SITE_NAME}`,
        "reyvinstore",
        `topup game ${product.name} online murah`,
        `topup game terpercaya hanya di ${process.env.NEXT_PUBLIC_SITE_NAME}`,
        `topup ${product.name}`,
        `beli diamond ${product.name} murah`,
        `${process.env.NEXT_PUBLIC_SITE_NAME} topup games ${product.name}`,
        `topup games ${product.name}`,
        "topup pubg mobile",
        "topup free fire",
        "topup valorant",
        "topup game termurah",
        "game voucher",
        `game online ${product.name}`,
        `games online ${product.name}`,
        "Top Up dan Jual Voucher Game Termurah dan Lengkap",
        `Tempat Top up Game murah cepat dan terpercaya - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      ],
    };
}

const page = async ({ params }: { params: { name: string } }) => {
  const { name } = params
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL }/api/v1/product/detail/${name}`)
  const { product } = await response.data
  return( 
    <div>
        <div className="flex justify-center items-center py-3">
      <div className="md:max-w-md max-sm:max-w-[375px] rounded-lg shadow-2xl">
        <Image
          className="rounded-md"
          src={product.image}
          width="100"
          height="100"
          layout="responsive"
          objectFit="cover"
          alt={product.name}
        />
        <div className="p-3 text-center">
          <h1 className="mb-2 text-xl font-bold tracking-tight">
            {product.name}
          </h1>
          <hr className="my-3 border-black sm:mx-auto lg:my-4 opacity-20" />
          <h1 className="text-left font:bold text-lg py-3">Price List:</h1>
          <p className="whitespace-pre-line font-mono leading-6 mb-3 font-normal text-left">
            {product.price}
          </p>
          <hr className="my-3 border-black sm:mx-auto lg:my-4 opacity-20" />
          <Link
            href="https://wa.me/6285173125847"
            className="inline-flex dark:text-slate-600 items-center px-4 py-3 text-sm font-medium text-center bg-lime-500 rounded-lg hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-blue-300">
            <BsWhatsapp /> <span className="px-[5px]">Pesan</span>
          </Link>
        </div>
      </div>
    </div>
    </div>
  )
};

export default page;
