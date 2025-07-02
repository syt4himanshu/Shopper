import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";
import React, { useState } from "react";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productQuantity, setProductQuantity] = useState(0);
  const [product, setProduct] = useState({
    name: "",
    old_price: "",
    new_price: "",
    category: "women",
    image: null,
    quantity: 0,
  });
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setProductQuantity(isNaN(value) ? 0 : value);
    setProduct({ ...product, quantity: isNaN(value) ? 0 : value });
  };

  const Add_Product = async () => {
    const quantity = parseInt(productQuantity, 10);
    if (isNaN(quantity) || quantity < 0) {
      alert("Quantity must be a non-negative number.");
      return;
    }
    const productToSend = { ...product, quantity };
    console.log(productToSend);
    let responseData;
    let formData = new FormData();
    formData.append("product", image);

    await fetch("http://localhost:4000/upload", {
      method: "Post",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      productToSend.image = responseData.image_url;
      console.log(productToSend);
      await fetch("http://localhost:4000/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json',

        },
        body: JSON.stringify(productToSend),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success ? alert("Product Added") : alert("Failed");
        });
    }
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input
          value={product.name}
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="Type Here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={product.old_price}
            onChange={handleChange}
            type="text"
            name="old_price"
            placeholder="type here"
          />
        </div>
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={product.new_price}
            onChange={handleChange}
            type="text"
            name="new_price"
            placeholder="type here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={product.category}
          onChange={handleChange}
          name="category"
          className="add-product-selector"
        >
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <p>Quantity</p>
        <input
          value={productQuantity}
          onChange={handleQuantityChange}
          type="number"
          name="quantity"
          min="0"
          placeholder="Enter quantity"
        />
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            alt="upload_area"
            className="addproduct-thumban-img"
          />
        </label>
        <input
          onChange={handleImageChange}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button onClick={Add_Product} className="addproduct-btn">Add Product</button>

    </div>
  );
};

export default AddProduct;
