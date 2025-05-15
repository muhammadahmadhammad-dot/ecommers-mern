import React from "react";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../../../Components/TextInput";
import { useForm } from "react-hook-form";

const Create = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError, //use to set server side error
  } = useForm();

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
          <form action="">
            <div className="mb-3">
              <TextInput
                label="Name"
                type="text"
                placeholder="Please Enter Name"
                handelField={register("name", {
                  required: "Category name is required",
                })}
              />
            </div>
          </form>
        </div>

        <div className="justify-end card-actions">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Create;
