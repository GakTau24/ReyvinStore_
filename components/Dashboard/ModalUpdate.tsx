"use client";
import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { Categories } from "@prisma/client";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../../app/api/uploadthing/core";
import { ToastContainer, toast } from "react-toastify";

interface ModalProps {
  onClose: () => void;
  categories: Categories[];
  products: any;
}

const ModalUpdate = ({ onClose, categories, products}: ModalProps) => {
  const [name, setName] = useState(products.name || "");
  const [image, setImage] = useState(products.image);
  const [price, setPrice] = useState(products.price || "");
  const [categoryId, setCategoryId] = useState(products.categoryId || "");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/api/v1/product/${products.id}`, {
        name: name,
        image: image,
        price: price,
        categoryId: Number(categoryId),
      });
      setName("");
      setImage("");
      setPrice("");
      setCategoryId("");
      toast.success("Updated Success!", {
        position: "top-right",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto">
      <ToastContainer autoClose={2000} />
      <div className="bg-white p-8 rounded-lg md:w-1/2 max-sm:w-[85%]">
        <button
          className="text-end text-black bg-red-500 hover:bg-red-600 p-4 rounded-xl"
          onClick={onClose}
        >
          X
        </button>
        <h1 className="text-2xl max-md:text-md font-bold mb-4 max-sm:mt-5 lg:mt-10 text-center text-black">
          Update {products.name}
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label htmlFor="slug" className="block mb-2 text-sm font-medium text-black">
              Name
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="example-example-example"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="image" className="block mb-2 text-sm font-medium text-black">
              Image
            </label>
            <UploadButton<OurFileRouter, any>
              endpoint="imageUploader"
              onClientUploadComplete={(res: any) => {
                toast.update("Updated Success!")
                setImage(res[0].url);
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
              className="custom-class"
            />

            {/* <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="https://example.com"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            /> */}
          </div>
          <div>
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-black">
              Price
            </label>
            <textarea
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="example"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select Category</option>
              {categories.map((cat: Categories) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdate;
