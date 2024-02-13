import type { Metadata, ResolvingMetadata } from "next";
import Products from "@/components/Product/Products";
import Count from "@/components/Count/Count";
import { MetaProps } from "@/helper";
import { Product } from "@prisma/client";

async function getData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL }/api/v1/product`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const { products } = await response.json();
    return products;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export async function generateMetadata(
  { params, searchParams }: MetaProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const data = await getData();
  const title = data.map((prod: Product) => prod.name);
  const keywords = data.map((title: Product) => title.name);

  const previousImages = (await parent)?.openGraph?.images || [];
  return {
    title: `Topup Game | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    openGraph: {
      images: [
        {
          url: "https://media.discordapp.net/attachments/987438938966872186/1135192344984043540/REYVN_LOGO.png?ex=6550c9c1&is=653e54c1&hm=23bb7b73327019d5a82078b30b4e0d2bb66c28e6caaecc57d2cffacdab601240&=&width=268&height=379",
          alt: "Reyvin Store",
        },
        ...previousImages,
      ],
      title: `Topup Game - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
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
    icons:
      "https://media.discordapp.net/attachments/987438938966872186/1135192344984043540/REYVN_LOGO.png?width=284&height=402",
    keywords: [
      "reyvin store",
      "reyvinstore",
      "topup reyvinsotre",
      "Top Up dan Jual Voucher Game Termurah dan Lengkap",
      `Tempat Top up Game murah cepat dan terpercaya - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      ...title.map((title: string) => `games ${title}`),
      ...keywords,
      "topup game online murah",
      "beli diamond murah",
      "topup game termurah",
    ],
  };
}

const page = async () => {
  return (
    <div className="py-5">
      <Count />
      <Products />
    </div>
  );
};

export default page;
