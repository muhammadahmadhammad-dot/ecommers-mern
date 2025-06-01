import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import TextInput from "../../../Components/TextInput";
import { mergeError } from "../../../helper/formHelper";
import FileInput from "../../../Components/FileInput.jsx";
import SelectInput from "../../../Components/SelectInput.jsx";
import { useSelector } from "react-redux";

const Edit = () => {
  const params = useParams();
  const { id } = params;
  const token = useSelector((state)=>(state.auth.token))

  const navigate = useNavigate();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError, //use to set server side error
    watch, //  selected value if needed
  } = useForm();
  const categoryValue = watch("category") || "";
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
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/products/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data?.message || "Product updated successfully");

      navigate("/dashboard/product");
    } catch (error) {
      if (error.response.data.validateErrors) {
        mergeError(error.response.data?.validateErrors, setError);
      }
      toast.error(error.response.data?.message || "Failed to update Product.");
    }
  };
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
      value: "true",
    },
    {
      title: "In-Active",
      value: "false",
    },
  ];

  useEffect(() => {
    const fetchProduct = async (id) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response?.data?.product) {
          // This sets all form values at once
           const productData = {
          ...response.data.product,
          status: response.data.product.status?.toString(), // convert Boolean → String
        };

        reset(productData);
        }
      } catch (error) {
        toast.error(error.response.data?.message || "Failed to fetch Product.");
      }
    };

    fetchProduct(id);
    fetchCategories();
  }, [id, reset]);
  return (
    <div className="card w-full mt-5 bg-base-100 card-xl shadow-sm">
      <div className="card-body">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="card-title">Product Edit</h2>
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
                handelField={register("featureImage")}
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
                defaultValue={categoryValue}
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
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
