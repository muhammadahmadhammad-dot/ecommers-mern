import axios from "axios";
import  { useEffect, useState  } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import TextInput from "../../../Components/TextInput";
import { mergeError } from "../../../helper/formHelper";
import { useSelector } from "react-redux";

const Edit = () => {
  const params = useParams();
  const { id } = params;
  const [loading, setLoading] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const token = useSelector((state)=>(state.auth.token))

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors},
    setValue,
    setError, //use to set server side error
  } = useForm();

  const onSubmit = async (data) => {
    try {
       setLoading(true)
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
      setLoading(false)
      navigate("/dashboard/category");
    } catch (error) {
       setLoading(false)
      if (error.response.data.validateErrors) {
        mergeError(error.response.data?.validateErrors, setError);
      }
      toast.error(error.response.data?.message || "Failed to update Category.");
    }
  };

  useEffect(() => {
    const fetchCategory = async (id) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/categories/${id}`, {
          headers: {
            Authorization:`Bearer ${token}`
          },
        }
        );
        const name = response.data.category.name;
        setPageTitle(name)
        setValue("name", name);
      } catch (error) {
        toast.error(
          error.response.data?.message || "Failed to fetch Category."
        );
      }
    };

    fetchCategory(id);
  }, [id, setValue]);

   useEffect(() => {
              document.title = `Category - ${pageTitle} - Dashboard| ${import.meta.env.VITE_APP_NAME}`;
    }, [pageTitle]);
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
                disabled={loading}
              >
                {loading ? <span className="loading loading-spinner loading-lg"></span> : 'Update'}
                
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
