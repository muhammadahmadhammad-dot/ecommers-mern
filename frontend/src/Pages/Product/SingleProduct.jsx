import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ProductShopButtons from "../../Components/ProductShopButtons";

const SingleProduct = () => {
  const params = useParams();
  const { slug } = params;
  const [product, setProduct] = useState({});


  const fetchProduct = async (slug) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/products/product/${slug}`
      );
      // console.log(response);
      setProduct(response.data.product || {});
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch Products.");
    }
  };
  useEffect(() => {
    fetchProduct(slug);
  }, [slug, setProduct]);

  return (
    <div className="card bg-base-100 w-full mt-5 ">
      <div className="grid gap-6 md:grid-cols-2 sm:grid-cols-1">
        <div>
          <figure className="px-10 pt-10">
            <img
              src={product?.featureImage?.source_url}
              alt={product.title}
              className="rounded-xl"
            />
          </figure>
        </div>
        <div className="card-body ">
          <div className="grid grid-cols-2 ">
            <div>
              <h2 className="card-title  ">{product.title}</h2>
            </div>
            <div className=" flex ">
              <span className="card-title ms-auto">{product.price} PKR</span>
            </div>
          </div>
          <h4 className="card-title">Short Description</h4>
          <p>{product.short_description}</p>
          <h4 className="card-title">Description</h4>
          <p>{product.description}</p>
          <div className="card-actions">
            <ProductShopButtons product={product}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
