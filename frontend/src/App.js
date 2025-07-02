import "./App.css";
import Navbar from "./components/navbar/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home"; // Import the separate Home component
import { ShopCategory } from "./pages/ShopCategory";
import { Product } from "./pages/Product";
import { LoginSignup } from "./pages/LoginSignup";
import { Cart } from "./pages/Cart";
import Footer from "./components/Footer/Footer";
import men_banner from "./components/Assets/banner_mens.png";
import kid_banner from "./components/Assets/banner_kids.png";
import women_banner from "./components/Assets/banner_women.png";

// Extracted category components with pre-configured props
const MensCategory = () => (
  <ShopCategory banner={men_banner} category="men" />
);

const WomensCategory = () => (
  <ShopCategory banner={women_banner} category="women" />
);

const KidsCategory = () => (
  <ShopCategory banner={kid_banner} category="kids" />
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mens" element={<MensCategory />} />
          <Route path="/womens" element={<WomensCategory />} />
          <Route path="/kids" element={<KidsCategory />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;