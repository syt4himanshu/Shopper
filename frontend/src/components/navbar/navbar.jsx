import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';


const Navbar = () => {
  // Placeholder for cart count, replace with context/state as needed
  const cartCount = 0;

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={logo} alt="logo" className="nav-logo-img" />
        <span className="nav-brand">SHOPPER</span>
      </div>
      <div className="nav-center">
        <NavLink exact="true" to="/" className="nav-link" activeclassname="active">Shop</NavLink>
        <NavLink to="/mens" className="nav-link" activeclassname="active">Men</NavLink>
        <NavLink to="/womens" className="nav-link" activeclassname="active">Women</NavLink>
        <NavLink to="/kids" className="nav-link" activeclassname="active">Kids</NavLink>
      </div>
      <div className="nav-right">
        <NavLink to="/login">
          <button className="nav-login-btn">Login</button>
        </NavLink>
        <NavLink to="/cart" className="nav-cart-link">
          <img src={cart_icon} alt="cart" className="nav-cart-img" />
          <span className="nav-cart-count">{cartCount}</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
