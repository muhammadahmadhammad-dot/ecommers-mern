import React, { useEffect, useState } from "react";
import Slider from "../Components/Slider";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "../Components/ProductCard.jsx";

const Home = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/products/`
      );
      console.log(response);
      setProducts(response.data.products || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch Products.");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <Slider />
      <div className="mt-5">
        <div className="carousel rounded-box">
          
          {/* {products &&
            products.map((product, idx) => (
              <div key={idx} className="carousel-item">
                <Link to={`/shop/product-detail/${product?.slug}`}>
                  <img src={product?.featureImage.source_url} alt={product.title} />
                </Link>
              </div>
            ))} */}
        </div>
      </div>
      <div className="mt-5">
        <div className="grid grid-cols-3">
          {products &&
            products.map((product, idx) => (
              <ProductCard
                key={idx}
                featuredImage={product?.featureImage.source_url}
                title={product.title}
                short_description={product.short_description}
                slug={product.slug}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
