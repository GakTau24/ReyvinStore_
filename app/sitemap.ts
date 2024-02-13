import { Product } from "@prisma/client";

async function getDataProduct(): Promise<Product[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/product`, {cache: "no-store"});
  if (!response.ok) {
    throw new Error("Failed to fetch data from API");
  }
  const data = await response.json();
  console.log(data)
  return data;
}


export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const  { products } : any = await getDataProduct();
    console.log(products)

    const dataSite = products.map((item: Product) => {
      return {
        url: `${baseUrl}/product/${item.name}`,
        lastModified: new Date(),
        title: item.name,
      };
    });
    
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
      },
      ...dataSite,
    ];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
      },
    ];
  }
}