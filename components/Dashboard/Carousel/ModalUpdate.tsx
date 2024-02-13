"use client";
import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { Categories } from "@prisma/client";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../../../app/api/uploadthing/core";
import { ToastContainer, toast } from "react-toastify";

interface ModalProps {
  onClose: () => void;
  carousel: any;
}

const ModalUpdate = ({ onClose, carousel }: ModalProps) => {
  const [image, setImage] = useState(carousel.image || "");
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/api/v1/carousel/${carousel.id}`, {
        image: image,
      });
      setImage("");
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
          Update
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-medium text-black"
            >
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
