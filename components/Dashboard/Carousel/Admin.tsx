"use client";
import { useState, useEffect } from "react";
import ModalCreate from "./ModalCreate";
import axios from "axios";
import { Carousel } from "@prisma/client";
import ModalDelete from "../ModalDelete";
import ModalUpdate from "./ModalUpdate";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from "../Sidebar";
import Image from "next/image";


const Admin = () => {
  const [modalCreate, setModalCreate] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [carousel, setCarousel] = useState<Carousel[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedCarouselId, setSelectedCarouselId] = useState<string | null>(null);

  const toggleModalCreate = () => {
    setModalCreate(!modalCreate);
  };
  const toggleModalUpdate = (carouselId: string) => {
    setModalUpdate(!modalUpdate);
    setSelectedCarouselId(carouselId)
  };

  const handleDelete = async (id: any) => {
    const option = {
      method: "DELETE",
      body: JSON.stringify({ id }),
    };
    const response = await fetch(`/api/v1/product?id=${id}`, option);
    const deleted = await response.json();
    toast.success("Deleted Success!", {
      position: "top-right",
    });
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  };
  const handleDeleteClick = (id: any) => {
    setShowModal(true);
    setDeleteId(id);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/v1/carousel");
        setCarousel(response.data.carousel);
      } catch (error) {
        console.error("Error fetching carousel:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex md:flex-row">
      <Sidebar />
      <ToastContainer autoClose={2000} />
      <div className="flex flex-col flex-grow p-4">
        <button
          onClick={toggleModalCreate}
          className="bg-yellow-500 hover:bg-yellow-600 p-4 rounded-xl self-start mb-4"
        >
          Create
        </button>
        <h1 className="text-2xl font-bold text-center pb-3">Dashboard</h1>
        {modalCreate && (
          <>
            <div className="fixed inset-0 z-50 bg-black opacity-50"></div>
            <ModalCreate onClose={toggleModalCreate} />
          </>
        )}
        <div className={`relative ${modalCreate ? "filter blur-md" : ""}`}>
          <div className="overflow-x-auto max-md:max-h-[33rem] lg:max-h-[33rem] flex justify-center text-center">
            <table className="w-full table-auto max-md:table-fixed border-collapse">
              <thead>
                <tr>
                  <th className="p-2 border-current border-b">Image</th>
                  <th className="p-2 border-current border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {carousel.map((car: Carousel) => (
                  <tr key={car.id}>
                    <td className="p-2 border-current border-b">
                      <div>
                        <Image src={car.image} alt="carousel image" width={500} height={500} />
                      </div>
                    </td>
                    <td className="p-2 border-current border-b">
                      <div className="flex justify-center items-center">
                        <button
                          className="bg-red-600 hover:bg-red-700 p-2 rounded-lg mr-2"
                          onClick={() => handleDeleteClick(car.id)}
                        >
                          DELETE
                        </button>
                        <button
                          className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg"
                          onClick={() => toggleModalUpdate(car.id)}
                        >
                          EDIT
                        </button>
                      </div>
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {showModal && (
          <ModalDelete
            setShowModal={setShowModal}
            handleDeleteClick={() => handleDelete(deleteId)}
          />
        )}
        {selectedCarouselId && (
        <ModalUpdate
          onClose={() => toggleModalUpdate('')}
          carousel={carousel.find(product => product.id === selectedCarouselId)}
        />
      )}
      </div>
    </div>
  );
};

export default Admin;
