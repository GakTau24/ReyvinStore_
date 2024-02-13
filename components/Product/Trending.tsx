import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Categories, Product } from "@prisma/client";

interface IProducts extends Product {
  category: Categories & { name: string };
}

const Trending = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL }/api/v1/product`);
    const data = await response.json();
    const filteredProducts = data.products.filter(
      (prod: IProducts) => prod.category.name === "Trending"
    );

    if (filteredProducts.length === 0) {
      return <h1>No Product yet...</h1>
    }

    return (
      <div className="flex flex-col md:p-4 mx-auto">
        <hr className="sm:mx-auto border-gray-500 lg:my-4 opacity-30 py-3" />
        <h1 className="flex justify-center items-center mb-3 font-bold md:text-center text-2xl">
          Trending
        </h1>
        <div className="flex flex-col justify-center items-center">
          <div className="grid sm:grid-cols-3 max-sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-3 max-sm:gap-2.5 md:gap-2.5 md:w-2/3 lg:w-[55%] max-sm:w-full">
            {filteredProducts.map((prod: IProducts) => {
              return (
                <div key={prod.id}>
                  <Link href={`/product/${prod.name}`}>
                    <div className="bg-opacity-70 backdrop-filter backdrop-blur-xl backdrop-brightness-110 rounded-xl shadow-xl lg:h-48 md:h-52 border border-yellow-500">
                      <Image src={prod.image} width={700} height={700} alt="" />
                      <div className="py-3">
                        <h1 className="md:text-md max-md:text-sm max-md:font-semibold max-md:font-sans text-center px-3">
                          {prod.name}
                        </h1>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return <div>Error fetching products</div>;
  }
};

export default Trending;
