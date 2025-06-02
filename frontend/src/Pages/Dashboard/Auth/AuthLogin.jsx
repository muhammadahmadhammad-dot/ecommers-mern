import React, { useEffect, useState } from "react";
import TextInput from "../../../Components/TextInput";
import { useForm } from "react-hook-form";
import { mergeError } from "../../../helper/formHelper.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../feature/auth/authSlice.js";

const AuthLogin = () => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError, //use to set server side error
  } = useForm();

  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const response = await dispatch(login(data)).unwrap();
      setLoading(false)
      if (response.success) {
        toast.success(response?.message || "Login Successfull.");
        // if (response?.user?.role) {
        //   navigate("/dashboard");
        //   return;
        // }
        navigate("/dashboard");
      } else {
        if (response.validateErrors) {
          mergeError(response?.validateErrors, setError);
        }
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error(error?.message || "Login Failed! Please try again.");
    }
  };
   useEffect(() => {
          document.title = `Login - Dashboard| ${import.meta.env.VITE_APP_NAME}`;
    }, []);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card bg-base-100 w-96 p-4 shadow-sm">
        <div className="card-header">
          <h2 className="card-title mx-auto">Login</h2>
        </div>
        <div className="card-body">
          <p>Enter Email and Password</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <TextInput
                label={"Enter Email"}
                placeholder={"Enter Your Email"}
                type={"email"}
                handelField={register("email", {
                  required: "Email is required",
                })}
              />
              {errors.email && (
                <p className="text-error">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-3">
              <TextInput
                label={"Enter Password"}
                placeholder={"Enter Your Password"}
                type={"password"}
                handelField={register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <p className="text-error">{errors.password.message}</p>
              )}
            </div>
            <div className="mb-3">
              <button disabled={loading} className={`btn btn-${loading ? 'neutral btn-soft' : 'primary'} w-full`} type="submit">
                 {loading ? <span className="loading loading-spinner loading-lg"></span> : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;
