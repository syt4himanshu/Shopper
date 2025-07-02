import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";

const Item = (props) => {
  const calculateDiscount = (newPrice, oldPrice) => {
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
  };

  return (
    <div className="item-card">
      <Link to={`/product/${props.id}`} aria-label={`View details for ${props.name}`}>
        <img
          src={props.image}
          alt={props.altText || `Image of ${props.name}`}
          className="item-image"
        />
      </Link>
      <p className="item-name">{props.name}</p>
      <div
        className="item-prices"
        data-discount={`${calculateDiscount(props.new_price, props.old_price)}% OFF`}
      >
        <div className="item-price-new">${props.new_price}</div>
        <div className="item-price-old">${props.old_price}</div>
      </div>
      {/* Optional: Add to Cart button if intended */}
      {/* <button className="item-btn">Add to Cart</button> */}
    </div>
  );
};

export default Item;