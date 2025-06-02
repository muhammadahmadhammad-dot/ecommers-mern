import React, { useEffect, useState } from "react";
import Slider from "../Components/Slider";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "../Components/ProductCard.jsx";
import Category from "../Components/Category.jsx";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/products/`
      );
      setProducts(response.data.products || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch Products.");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const handleCategory = (id) => {
    setSelectedCategoryId(id);
  };
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
        <Category
          handleCategory={handleCategory}
          setSelectedCategoryId={setSelectedCategoryId}
          selectedCategoryId={selectedCategoryId}
        />
        <div className="grid gap-3 grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {products &&
            products
              .filter((product) =>
                selectedCategoryId
                  ? product.category === selectedCategoryId
                  : true
              )
              .map((product, idx) => (
                <ProductCard
                  key={idx}
                  id={product.category}
                  product={product}
                />
              ))}
        </div>
      </div>
    </>
  );
};

export default Home;
