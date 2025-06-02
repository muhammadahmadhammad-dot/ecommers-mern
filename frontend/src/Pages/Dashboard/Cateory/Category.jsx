import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const Category = () => {
    const token = useSelector((state)=>(state.auth.token))
     const [loading, setLoading] = useState(false);
      const [deleteLoading, setDeleteLoading] = useState({
        id: "",
        status: false,
      });
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/categories`
      );
      setLoading(false)
      setCategories(response.data.categories || []);
    } catch (error) {
      setLoading(false)
      toast.error(
        error.response?.data?.message || "Failed to fetch Categories."
      );
    }
  };
  const deleteCategory = async (id) => {
  
    try {
      setDeleteLoading({
        id: id,
        status: true,
      });
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/categories/delete/${id}`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );
      setDeleteLoading({
        id: '',
        status: false,
      });
      setCategories((prev) => prev.filter((item) => item._id !== id));
      toast.success(response.data?.message || "Category deleted Successfully.");
    } catch (error) {
       setDeleteLoading({
        id: '',
        status: false,
      });
      toast.error(error.response.data?.message || "Failed to delete Category.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [token]);
  useEffect(() => {
            document.title = `Category - Dashboard| ${import.meta.env.VITE_APP_NAME}`;
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
           {loading ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : (
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
                        <button
                        disabled={deleteLoading.id == category._id && deleteLoading.status == true}
                         onClick={()=>deleteCategory(category._id)} className="btn btn-danger">
                          {deleteLoading.id == category._id && deleteLoading.status == true ? <span className="loading loading-spinner loading-lg"></span> : 'Delete'}
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

export default Category;
