import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { Breadcrum } from "../components/Breadcrums/Breadcrum";
import { ProductDisplay } from "../components/ProductDisplay/ProductDisplay";
import './CSS/Product.css';
import { DescriptionBox } from "../components/DescriptionBox/DescriptionBox";
import { RelatedProducts } from "../components/RelatedProducts/RelatedProducts";
export const Product = () => {
  const { all_products } = useContext(ShopContext);
  const { id } = useParams();
  const productId = id;

  // Guard: If productId is missing, show a user-friendly error
  if (!productId) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Invalid product link</h2>
        <p>No product ID provided in the URL.</p>
      </div>
    );
  }

  // Check if all_products is available
  if (!all_products || all_products.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  
  // Find the product if all_products is available
  const product = all_products.find((e) => e.id === Number(productId));

  // Check if product was found
  if (!product) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <p>The product you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts/>
    </div>
  );
};
