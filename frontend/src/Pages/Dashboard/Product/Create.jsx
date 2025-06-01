import { Link, useNavigate } from "react-router-dom";
import TextInput from "../../../Components/TextInput";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { mergeError } from "../../../helper/formHelper.js";
import FileInput from "../../../Components/FileInput.jsx";
import SelectInput from "../../../Components/SelectInput.jsx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Create = () => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const navigate = useNavigate();
  const token = useSelector((state)=>(state.auth.token))
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm();
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setCategoryOptions(response.data.categories || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch Categories."
      );
    }
  };
  const options = [
    {
      title: "Active",
      value: true,
    },
    {
      title: "In-Active",
      value: false,
    },
  ];
  const onSubmit = async (data) => {
    

    const formData = new FormData();
    if (data.featureImage && data.featureImage.length > 0) {
      formData.append("featureImage", data.featureImage[0]);
    }
    formData.append("title", data.title);
    formData.append("price", String(data.price));
    formData.append("category", data.category);
    formData.append("status", data.status);
    formData.append("short_description", data.short_description);
    formData.append("description", data.description);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/products/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data?.message);
      navigate("/dashboard/product");
    } catch (error) {
      if (error.response.data.validateErrors) {
        mergeError(error.response.data?.validateErrors, setError);
      }
      toast.error(error.response.data?.message || "Product Creation Failed.");
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
            <h2 className="card-title">Product Create</h2>
          </div>
          <div className="text-end">
            <Link to={"/dashboard/product"} className="btn btn-warning">
              Back
            </Link>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <TextInput
                label="Title"
                type="text"
                placeholder="Please Enter Title"
                handelField={register("title", {
                  required: "Title is required",
                })}
              />
              {errors.title && (
                <p className="text-error">{errors.title.message}</p>
              )}
            </div>
            <div className="mb-3">
              <FileInput
                label={"Feature Image"}
                handelField={register("featureImage", {
                  required: "Image is required",
                })}
              />
              {errors.featureImage && (
                <p className="text-error">{errors.featureImage.message}</p>
              )}
            </div>
            <div className="mb-3">
              <TextInput
                label="Price"
                type="number"
                placeholder="Please Enter Price"
                handelField={register("price", {
                  required: "Price is required",
                })}
              />
              {errors.price && (
                <p className="text-error">{errors.price.message}</p>
              )}
            </div>
            <div className="mb-3">
              <SelectInput
                label={"Please Select Category"}
                value={watch("category") || ""}
                options={categoryOptions}
                handelField={register("category", {
                  required: "Category is required",
                })}
              />

              {errors.category && (
                <p className="text-error">{errors.category.message}</p>
              )}
            </div>
            <div className="mb-3">
              <SelectInput
                label={"Please Select Status"}
                value={watch("status") || ""}
                options={options}
                handelField={register("status", {
                  required: "Status is required",
                })}
              />

              {errors.status && (
                <p className="text-error">{errors.status.message}</p>
              )}
            </div>

            <div className="mb-3">
              <TextInput
                label="Short Description"
                type="text"
                placeholder="Please Enter Short Description"
                handelField={register("short_description", {
                  required: "Short Description is required",
                })}
              />
              {errors.short_description && (
                <p className="text-error">{errors.short_description.message}</p>
              )}
            </div>
            <div className="mb-3">
              <TextInput
                label="Description"
                placeholder="Please Enter Long Description"
                handelField={register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p className="text-error">{errors.description.message}</p>
              )}
            </div>
            <div className="mb-3">
              <button className="btn btn-primary " type="submit">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
