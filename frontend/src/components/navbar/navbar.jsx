import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const { getTotalCartItems } = useContext(ShopContext);

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    window.location.replace("/");
  };

  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem("auth-token");

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={logo} alt="logo" className="nav-logo-img" />
        <span className="nav-brand">SHOPPER</span>
      </div>
      <div className="nav-center">
        <NavLink
          to="/"
          className="nav-link"
          activeclassname="active"
        >
          Shop
        </NavLink>
        <NavLink to="/mens" className="nav-link" activeclassname="active">
          Men
        </NavLink>
        <NavLink to="/womens" className="nav-link" activeclassname="active">
          Women
        </NavLink>
        <NavLink to="/kids" className="nav-link" activeclassname="active">
          Kids
        </NavLink>
      </div>
      <div className="nav-right">
        {isAuthenticated ? (
          <button className="nav-login-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <NavLink to="/login">
            <button className="nav-login-btn">Login</button>
          </NavLink>
        )}
        
        <NavLink to="/cart" className="nav-cart-link">
          <img src={cart_icon} alt="cart" className="nav-cart-img" />
          {/* ✅ CORRECT - Call the function to get the value */}
          <span className="nav-cart-count">{getTotalCartItems()}</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;