import axios from "axios";
import  { useEffect  } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import TextInput from "../../../Components/TextInput";
import { mergeError } from "../../../helper/formHelper";

const Edit = () => {
  const params = useParams();
  const { id } = params;

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors},
    setValue,
    setError, //use to set server side error
  } = useForm();

  const onSubmit = async (data) => {
     const token = window.localStorage.getItem('token')
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/categories/update/${id}`,
        data, {
          headers: {
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
          },
        }
      );
      toast.success(response.data?.message || "Category updated successfully");

      navigate("/dashboard/category");
    } catch (error) {
      if (error.response.data.validateErrors) {
        mergeError(error.response.data?.validateErrors, setError);
      }
      toast.error(error.response.data?.message || "Failed to update Category.");
    }
  };

  useEffect(() => {
    const fetchCategory = async (id) => {
       const token = window.localStorage.getItem('token')
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/categories/${id}`, {
          headers: {
            Authorization:`Bearer ${token}`
          },
        }
        );
        const name = response.data.category.name;
        setValue("name", name);
      } catch (error) {
        toast.error(
          error.response.data?.message || "Failed to fetch Category."
        );
      }
    };

    fetchCategory(id);
  }, [id, setValue]);

  return (
    <div className="card w-full mt-5 bg-base-100 card-xl shadow-sm">
      <div className="card-body">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="card-title">Category Edit</h2>
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
              <button
                className="btn btn-primary"
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
