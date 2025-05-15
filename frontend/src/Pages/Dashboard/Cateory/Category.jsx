import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Category = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/categories`
      );
      setCategories(response.data.categories || []);
    } catch (error) {
      toast.error(
        error.response.data?.message || "Failed to fetch Categories."
      );
    }
  };
  const deleteCategory = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/categories/delete/${id}`
      );
      setCategories((prev) => prev.filter((item) => item._id !== id));
      toast.success(response.data?.message || "Category deleted Successfully.");
    } catch (error) {
      toast.error(error.response.data?.message || "Failed to delete Category.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="card w-full mt-5 bg-base-100 card-xl shadow-sm">
      <div className="card-body">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="card-title">Category</h2>
          </div>
          <div className="text-end">
            <Link to={"/dashboard/category/create"} className="btn btn-warning">
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
                  <th>Name</th>
                  <th>Created at</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories &&
                  categories.map((category, idx) => (
                    <tr key={category._id}>
                      <th>{idx + 1}</th>
                      <td>{category.name}</td>
                      <td>{category.createdAt}</td>
                      <td>
                        <Link to={`/dashboard/category/edit/${category._id}`} className="btn btn-secondary">Edit</Link>
                        <button onClick={()=>deleteCategory(category._id)} className="btn btn-danger">Delete</button>
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

export default Category;
