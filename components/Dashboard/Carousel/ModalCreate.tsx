"use client";
import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { Categories } from "@prisma/client";
import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ModalProps {
  onClose: () => void;
}

const ModalCreate = ({ onClose }: ModalProps) => {
  const [image, setImage] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/carousel", {
        image: image,
      });

      setImage("");
      toast.success("Created Success!", {
        position: "top-right",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    } catch (error) {
      console.error("Error creating carousel:", error);
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
          Create
        </h1>
        <div className="flex flex-col space-y-4">
          <div>
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-medium text-black"
            >
              Image
            </label>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // alert("Succes upload image");
                toast.success("Upload Success")
                setImage(res[0].url);
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
              className="custom-class"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={!image}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCreate;
