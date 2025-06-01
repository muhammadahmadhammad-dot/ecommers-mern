import React from "react";
import { Link } from "react-router-dom";
import ProductShopButtons from "./ProductShopButtons";

const ProductCard = ({ product, id }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-sm" id={id}>
        <figure>
      <Link to={`/shop/product-detail/${product.slug}`} className="h-60">
          <img src={product.featuredImage} alt={product.title} />
      </Link>
        </figure>
        <div className="card-body">
          <Link to={`/shop/product-detail/${product.slug}`} >
          <h2 className="card-title">{product.title}</h2>
          <p>{product.short_description}</p>
          </Link>
          <div className="card-actions justify-between">
            <ProductShopButtons  product={product}/>
          </div>
        </div>
    </div>
  );
};

export default ProductCard;
