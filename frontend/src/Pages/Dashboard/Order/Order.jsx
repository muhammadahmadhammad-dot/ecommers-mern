import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state)=>(state.auth.token))
  const statusBadge = {
    Delivered: { text: "Delivered", class: "badge badge-accent" },
    Shipped: { text: "Shipped", class: "badge badge-info" },
    Processing: { text: "Processing", class: "badge badge-warning" },
    Cancelled: { text: "Cancelled", class: "badge badge-error" },
  };
  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/orders/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false)
      setOrders(response.data.orders || []);
    } catch (error) {
      setLoading(false)
      toast.error(error.response?.data?.message || "Failed to fetch Order.");
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="card w-full mt-5 bg-base-100 card-xl shadow-sm">
      <div className="card-body">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="card-title">Order</h2>
          </div>
          <div className="text-end">
            {/* <Link to={"/dashboard/product/create"} className="btn btn-warning">
              Create
            </Link> */}
          </div>
        </div>
        <div>
          {
            loading ? <span className="loading loading-dots loading-lg"></span> :  <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Created at</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((order, idx) => (
                    <tr key={order._id}>
                      <th>{idx + 1}</th>
                      <td>{order?.shippingInfo.name}</td>
                      <td>{order?.shippingInfo.phone}</td>
                      <td>{order?.shippingInfo.email}</td>
                      <td>
                        {statusBadge[order?.status] && (
                          <div className={statusBadge[order?.status].class}>{statusBadge[order?.status].text}</div>
                        )}
                      </td>
                      <td>{order?.totalAmount}</td>
                      <td>{order?.createdAt}</td>
                      <td>
                        <Link
                          to={`/dashboard/order/detail/${order._id}`}
                          className="btn btn-accent"
                        >
                          Detail
                        </Link>
                        {/* <button className="btn btn-error">Delete</button> */}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          }
         
        </div>
      </div>
    </div>
  );
};

export default Order;
