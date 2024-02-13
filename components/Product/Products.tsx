import Trending from "./Trending"
import ListProduct from "./ListProduct";
import axios from "axios"
import { Categories, Product } from "@prisma/client";
import Carousel from "./Carousel";

interface IProducts extends Product {
  category: Categories & { name: string };
}


const getDataMobile = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL }/api/v1/product`);
    const data = await response.data
    const filteredProducts = data.products.filter(
      (prod: IProducts) => prod.category.name === "Mobile"
  );
  return filteredProducts
}
const getDataPc = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/product`);
    const data = await response.data
    const filteredProducts = data.products.filter(
      (prod: IProducts) => prod.category.name === "PC"
  );
  return filteredProducts
}
const getDataApps= async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL }/api/v1/product`);
    const data = await response.data
    const filteredProducts = data.products.filter(
      (prod: IProducts) => prod.category.name === "Apps"
  );
  return filteredProducts
}
const getDataVoucher= async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL }/api/v1/product`);
    const data = await response.data
    const filteredProducts = data.products.filter(
      (prod: IProducts) => prod.category.name === "Pulsa & Token"
  );
  return filteredProducts
}

const Products = async () => {
  const mobile = await getDataMobile()
  const pc = await getDataPc()
  const apps = await getDataApps()
  const voucher = await getDataVoucher()
  return (
    <section className="p-4">
    <Carousel />
    <Trending />
    <ListProduct product={mobile} title="● Mobile Games" />
    <ListProduct product={pc} title="● PC Games" />
    <ListProduct product={apps} title="● Apps" />
    <ListProduct product={voucher} title="● Pulsa / Token" />
    </section>
  )
}

export default Products