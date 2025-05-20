import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, buyNow } from "../feature/cart/cartSlice.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const ProductShopButtons = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const cart = dispatch(addToCart(product));
    if (cart) {
      toast.success("Product add to cart successfully.");
      return;
    }
    toast.error("Product add to cart failed.");
  };
  const handleBuyNow = () => {
    dispatch(buyNow(product));
    navigate("/buy-now-checkout");
  };
  return (
    <>
      <button onClick={handleAddToCart} className="btn btn-success">
        Add to Cart
      </button>
      <button onClick={handleBuyNow} className="btn btn-primary">
        Buy Now
      </button>
    </>
  );
};

export default ProductShopButtons;
