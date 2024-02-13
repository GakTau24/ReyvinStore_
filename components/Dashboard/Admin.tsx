"use client";
import { useState, useEffect } from "react";
import ModalCreate from "./ModalCreate";
import axios from "axios";
import { Product, Categories } from "@prisma/client";
import ModalDelete from "./ModalDelete";
import ModalUpdate from "./ModalUpdate";
import { ToastContainer, toast } from "react-toastify";

interface IProducts extends Product {
  category: Categories & { name: string };
}

const Admin = () => {
  const [modalCreate, setModalCreate] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [products, setProducts] = useState<IProducts[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/v1/categories");
        setCategories(response.data.category);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const toggleModalCreate = () => {
    setModalCreate(!modalCreate);
  };
  const toggleModalUpdate = (productId: string) => {
    setModalUpdate(!modalUpdate);
    setSelectedProductId(productId);
  };

  const handleDelete = async (id: any) => {
    const option = {
      method: "DELETE",
      body: JSON.stringify({ id }),
    };
    const response = await fetch(`/api/v1/product?id=${id}`, option);
    const deleted = await response.json();
    toast.success("Created Success!", {
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
        const response = await axios.get("/api/v1/product");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="md:p-10 max-sm:p-5 mx-auto">
      <ToastContainer autoClose={2000} />
      <button
        onClick={toggleModalCreate}
        className="bg-yellow-500 hover:bg-yellow-600 p-4 rounded-xl"
      >
        Create
      </button>
      <div className="flex justify-center items-center mx-auto">
        <div className="justify-center items-center md:w-1/2">
          <h1 className="text-2xl font-bold text-center py-5">Dashboard</h1>
          {modalCreate && (
            <>
              <div className="fixed inset-0 z-50 bg-black opacity-50"></div>
              <ModalCreate
                onClose={toggleModalCreate}
                categories={categories}
              />
            </>
          )}
          <div className={`relative ${modalCreate ? "filter blur-sm" : ""}`}>
            <div className="overflow-x-auto max-md:max-h-[33rem] lg:max-h-[33rem]">
              <table className="w-full table-auto max-md:table-fixed border-collapse">
                <thead>
                  <tr>
                    <th className="p-2 border-current border-b">Title</th>
                    <th className="p-2 border-current border-b">Category</th>
                    <th className="p-2 border-current border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product: IProducts) => (
                    <tr key={product.id}>
                      <td className="p-2 border-current border-b">
                        {product.name}
                      </td>
                      <td className="p-2 border-current border-b">
                        {product.category.name}
                      </td>
                      <td className="p-2 border-current border-b">
                        <div className="flex justify-center items-center">
                          <button
                            className="bg-red-600 hover:bg-red-700 p-2 rounded-lg mr-2"
                            onClick={() => handleDeleteClick(product.id)}
                          >
                            DELETE
                          </button>
                          <button
                            className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg"
                            onClick={() => toggleModalUpdate(product.id)}
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
        </div>
      </div>
      {selectedProductId && (
        <ModalUpdate
          onClose={() => toggleModalUpdate('')}
          categories={categories}
          products={products.find(product => product.id === selectedProductId)}
        />
      )}
    </div>
  );
};

export default Admin;
