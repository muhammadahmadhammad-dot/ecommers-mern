import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../../../Components/TextInput";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { mergeError } from "../../../helper/formHelper.js";
import { useSelector } from "react-redux";

const Create = () => {
  const token = useSelector((state)=>(state.auth.token))
  const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError, //use to set server side error
  } = useForm();
  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/categories/create`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
          },
        }
      );
      toast.success(response.data?.message);
      setLoading(false)
      navigate('/dashboard/category')
    } catch (error) {
       setLoading(false)
      if (error.response.data.validateErrors) {
        mergeError(error.response.data?.validateErrors, setError);
      }
      toast.error(error.response.data?.message|| 'Category Creation Failed.');
    }
  };
   useEffect(() => {
              document.title = `Create New Category - Dashboard| ${import.meta.env.VITE_APP_NAME}`;
    }, []);
  return (
    <div className="card w-full mt-5 bg-base-100 card-xl shadow-sm">
      <div className="card-body">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="card-title">Category Create</h2>
          </div>
          <div className="text-end">
            <Link to={"/dashboard/category"} className="btn btn-warning">
              Back
            </Link>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <TextInput
                label="Name"
                type="text"
                placeholder="Please Enter Name"
                handelField={register("name", {
                  required: "Category name is required",
                })}
              />
              {errors.name && (
                <p className="text-error">{errors.name.message}</p>
              )}
            </div>
            <div className="mb-3">
              <button disabled={loading}  className="btn btn-primary " type="submit">
                 {loading ? <span className="loading loading-spinner loading-lg"></span> : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
