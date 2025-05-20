import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearBuyNow, clearCart } from "../../feature/cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import TextInput from "../../Components/TextInput";
import { toast } from "react-toastify";
import axios from "axios";
import { mergeError } from "../../helper/formHelper.js";

const BuyNowCheckout = () => {
  const buyNowItem = useSelector((state) => state.cart.buyNowItem);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError, //use to set server side error
  } = useForm();
  // );
  const itemToSend = {
    productId: buyNowItem._id,
    title: buyNowItem.title,
    quantity: 1,
    price: buyNowItem.price,
  };
  const totalAmount = buyNowItem.price * buyNowItem.quantity;
  const onSubmit = async (data) => {
    setLoading(true);
    try {
     const res =  await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/orders/create`,
        {
          items: [itemToSend],
          shippingInfo: {
            name: data.name,
            phone: data.phone,
            email: data.email,
            address: data.address,
          },
          totalAmount,
        }
      );

    if (res.data.success) {
      dispatch(clearCart());
      toast.success("Order placed successfully!");
      navigate("/");
    }
    } catch (err) {
      console.error(err);
      if (err.response.data.validateErrors) {
        mergeError(err.response.data?.validateErrors, setError);
      }
      toast.error("Checkout failed!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearBuyNow());
    };
  }, [dispatch]);

  if (!buyNowItem) {
    navigate("/");
  }
  return (
    <div className="card bg-base-100 w-full ">
      <div className="card-body">
        <div className="grid grid-cols-2">
          <div>
            <h2 className="card-title">Checkout</h2>
          </div>
          <div className="text-end">
            <Link to={"/"} className="btn btn-primary">
              Back
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 w-11/12 mx-auto">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <TextInput
                label="Name"
                type="text"
                placeholder="Please Enter Name"
                handelField={register("name", {
                  required: "Name is required",
                })}
              />
              {errors.name && (
                <p className="text-error">{errors.name.message}</p>
              )}
            </div>
            <div className="mb-3">
              <TextInput
                label="Phone"
                type="text"
                placeholder="Please Enter Phone"
                handelField={register("phone", {
                  required: "Phone is required",
                })}
              />
              {errors.phone && (
                <p className="text-error">{errors.phone.message}</p>
              )}
            </div>
            <div className="mb-3">
              <TextInput
                label="Email"
                type="email"
                placeholder="Please Enter Email"
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
                label="Address"
                type="text"
                placeholder="Please Enter Address"
                handelField={register("address", {
                  required: "Address is required",
                })}
              />
              {errors.address && (
                <p className="text-error">{errors.address.message}</p>
              )}
            </div>
            <div className="mb-3">
              <button
                className="btn btn-neutral"
                disabled={loading}
                type="submit"
              >
                {loading ? "Processing..." : "Place Order"}
              </button>
            </div>
          </form>
        </div>
        <div className="card-body">
          <h2 className="card-title">
            Order Summary
            <span className="text-end">{totalAmount}</span>
          </h2>
          <div className="flex gap-6">
            <div className="h-20 w-20">
              <img
                className="w-full h-full"
                src={buyNowItem?.featureImage?.source_url}
                alt=""
              />
            </div>
            <div>
              <h2 className="card-title ">{buyNowItem.title}</h2>
              <p>{buyNowItem.price}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNowCheckout;
