import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SelectInput from "../../../Components/SelectInput.jsx";
import { useForm } from "react-hook-form";
import { mergeError } from "../../../helper/formHelper.js";

const Show = () => {
  const params = useParams();
  const { id } = params;
  const [order, setOrder] = useState({});
  const navigate = useNavigate();
  const statusBadge = {
    Delivered: { text: "Delivered", class: "badge badge-accent" },
    Shipped: { text: "Shipped", class: "badge badge-info" },
    Processing: { text: "Processing", class: "badge badge-warning" },
    Cancelled: { text: "Cancelled", class: "badge badge-error" },
  };
  const badge = statusBadge[order?.status];
  const options = [
    {
      title: "Processing",
      value: "Processing",
    },
    {
      title: "Shipped",
      value: "Shipped",
    },
    {
      title: "Delivered",
      value: "Delivered",
    },
    {
      title: "Cancelled",
      value: "Cancelled",
    },
  ];
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue, //use to set server side error
    watch, //  selected value if needed
  } = useForm();
  const onSubmit = async (data) => {
    const token = window.localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/orders/update-status/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrder(response.data?.order);
      toast.success(
        response.data?.message || "Order Status updated successfully"
      );
    } catch (error) {
      if (error.response.data.validateErrors) {
        mergeError(error.response.data?.validateErrors, setError);
      }
      toast.error(error.response.data?.message || "Failed to update Product.");
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      const token = window.localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrder(response.data.order || {});
        setValue("status", response.data?.order?.status);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch Order.");
      }
    };

    fetchOrder(id);
  }, [id, setOrder, setValue]);
  return (
    <div className="card w-full mt-5 bg-base-100 card-xl shadow-sm">
      <div className="card-body">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="card-title">Order Detail</h2>
          </div>
          <div className="text-end">
            <Link to={"/dashboard/order"} className="btn btn-warning">
              Back
            </Link>
          </div>
        </div>
        <div className="card w-full mt-5 ">
          <table className="table ">
            <tbody>
              <tr>
                <th className="w-36">Name</th>
                <td>{order?.shippingInfo?.name}</td>
              </tr>
              <tr>
                <th className="w-36">Phone</th>
                <td>{order?.shippingInfo?.phone}</td>
              </tr>
              <tr>
                <th className="w-36">Email</th>
                <td>{order?.shippingInfo?.email}</td>
              </tr>
              <tr className="w-36">
                <th>Address</th>
                <td>{order?.shippingInfo?.address}</td>
              </tr>
              <tr className="w-36">
                <th>Created At</th>
                <td>{order?.createdAt}</td>
              </tr>
              <tr className="w-36">
                <th>Status</th>
                <td>
                  {badge && <div className={badge.class}>{badge.text}</div>}
                  <button
                    className="btn btn-neutral"
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                  >
                    Change Status
                  </button>
                  <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Change Status</h3>
                      <form onSubmit={handleSubmit(onSubmit)}>
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
                            <p className="text-error">
                              {errors.status.message}
                            </p>
                          )}
                        </div>
                        <div className="mb-3">
                          <button type="submit" className="btn btn-success">
                            Change
                          </button>
                        </div>
                      </form>

                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}

                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </td>
              </tr>
              <tr className="w-36">
                <th>Total Amount</th>
                <td>{order?.totalAmount}</td>
              </tr>
            </tbody>
          </table>
          <h2 className="card-title">Items</h2>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items &&
                  order.items.map((item, idx) => (
                    <tr key={item._id}>
                      <th>{idx + 1}</th>
                      <td>{item?.title}</td>
                      <td>{item?.quantity}</td>
                      <td>{item?.price}</td>
                      <td>{item?.price * item?.quantity}</td>
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

export default Show;
