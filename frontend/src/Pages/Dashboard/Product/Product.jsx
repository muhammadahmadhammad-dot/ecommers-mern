import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Product = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const token = window.localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/products/products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setProducts(response.data.products || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch Products.");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const deleteProducts = async (id) => {
    const token = window.localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/products/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts((prev) => prev.filter((item) => item._id !== id));
      toast.success(response.data?.message || "Product deleted Successfully.");
    } catch (error) {
      toast.error(error.response.data?.message || "Failed to delete Product.");
    }
  };
  return (
    <div className="card w-full mt-5 bg-base-100 card-xl shadow-sm">
      <div className="card-body">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="card-title">Product</h2>
          </div>
          <div className="text-end">
            <Link to={"/dashboard/product/create"} className="btn btn-warning">
              Create
            </Link>
          </div>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Created at</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((product, idx) => (
                    <tr key={product._id}>
                      <th>{idx + 1}</th>
                      <td>{product?.title}</td>
                      <td>{product?.createdAt}</td>
                      <td>
                        <Link
                          to={`/dashboard/product/edit/${product._id}`}
                          className="btn btn-secondary"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteProducts(product._id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
