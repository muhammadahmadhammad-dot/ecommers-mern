import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ featuredImage, title, short_description,slug }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
      <Link to={`/shop/product-detail/${slug}`}>
          <img src={featuredImage} alt={title} />
      </Link>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{short_description}</p>
          <div className="card-actions justify-between">
            <Link to={`/shop/product-detail/${slug}`} className="btn btn-success">View Detail</Link>
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
    </div>
  );
};

export default ProductCard;
