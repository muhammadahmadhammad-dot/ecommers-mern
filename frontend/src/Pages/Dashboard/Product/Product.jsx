import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Product = () => {
  const token = useSelector((state) => state.auth.token);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState({
    id: "",
    status: false,
  });
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/products/products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      setProducts(response.data.products || []);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Failed to fetch Products.");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const deleteProducts = async (id) => {
    try {
      setDeleteLoading({
        id: id,
        status: true,
      });
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/products/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts((prev) => prev.filter((item) => item._id !== id));
      setDeleteLoading({
        id: '',
        status: false,
      });
      toast.success(response.data?.message || "Product deleted Successfully.");
    } catch (error) {
      setDeleteLoading({
        id: '',
        status: false,
      });
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
          {loading ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : (
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
                            disabled={deleteLoading.id == product._id && deleteLoading.status == true}
                          >
                            {deleteLoading.id == product._id && deleteLoading.status == true ? <span className="loading loading-spinner loading-lg"></span> : 'Delete'}
                            
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
