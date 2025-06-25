import './App.css';
import Navbar from './components/navbar/navbar';
import {BrowserRouter,Routes,Route}from 'react-router-dom';
import { Shop } from './pages/Shop';
import { ShopCategory } from './pages/ShopCategory';
import { Product } from './pages/Product';
import { LoginSignup } from './pages/LoginSignup';
import { Cart } from './pages/Cart';
import { Hero } from './components/Hero/Hero';

function App() {
  return (
    <div  className="App">
      
      <BrowserRouter>
      <Navbar/>
      <Hero />
        <Routes>
          <Route path="/" element={<Shop/>}/>
          <Route path="/mens" element={<ShopCategory category="men"/>}/>
          <Route path="/womens" element={<ShopCategory category="women"/>}/>
          <Route path="/kids" element={<ShopCategory category="kids"/>}/>
          <Route path="/product" element={<Product/>}/>
          <Route path="/product/:id" element={<Product/>}/>
          <Route path="/login" element={<LoginSignup/>}/>
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
