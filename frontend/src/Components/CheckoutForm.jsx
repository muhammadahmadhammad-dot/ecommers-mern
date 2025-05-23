import React from "react";
import TextInput from "./TextInput";

const CheckoutForm = ({
  handleSubmit,
  CardElement,
  loading,
  onSubmit,
  errors,
  register,
  totalAmount,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {CardElement}
      <div className="mb-3">
        <TextInput
          label="Name"
          type="text"
          placeholder="Please Enter Name"
          handelField={register("name", {
            required: "Name is required",
          })}
        />
        {errors.name && <p className="text-error">{errors.name.message}</p>}
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
        {errors.phone && <p className="text-error">{errors.phone.message}</p>}
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
        {errors.email && <p className="text-error">{errors.email.message}</p>}
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
        <button className="btn btn-neutral" disabled={loading} type="submit">
          {loading ? "Processing..." : `Place Order and Pay Now ${totalAmount}`}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
