import React, { useState, createContext, useEffect } from 'react'

export const ShopContext = React.createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i < 300 + 1; i++) {
    cart[i] = 0;
  }
  return cart;
}

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem('auth-token'));
  
  // Listen for auth token changes
  useEffect(() => {
    // Fixed: Changed 'fectch' to 'fetch'
    fetch('http://localhost:4000/allproducts')
    .then((response)=>response.json())
    .then((data)=>setAll_Product(data))
    .catch((error) => console.error('Error fetching products:', error));
    
    const handleStorageChange = () => {
      const newToken = localStorage.getItem('auth-token');
      setAuthToken(newToken);
    };
    
    if(localStorage.getItem('auth-token')){
      fetch('http://localhost:4000/getcart',{
        method: 'POST',
        headers:{
          Accept: 'application/json', // Fixed: Changed 'applicatiom/form-data' to 'application/json'
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json',
        },
        body: JSON.stringify({}), // Fixed: Changed empty string to proper JSON
      }).then((response)=>response.json())
      .then((data)=>setCartItems(data))
      .catch((error) => console.error('Error fetching cart:', error));
    }

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  // Function to fetch products
  const fetchProducts = () => {
    console.log('🚀 Starting to fetch products...');
    setLoading(true);
    setError(null);
    
    const currentToken = localStorage.getItem('auth-token');
    console.log('🔑 Auth token found:', currentToken ? 'Yes' : 'No');
    
    // Prepare headers
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    
    // Add auth token if available
    if (currentToken) {
      headers['auth-token'] = currentToken;
      console.log('🔐 Including auth token in request');
    }
    
    fetch('http://localhost:4000/allproducts', {
      method: 'GET',
      headers: headers
    })
      .then((response) => {
        console.log('📡 Response received:', response);
        console.log('📊 Response status:', response.status);
        console.log('✅ Response ok:', response.ok);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('📦 Data received:', data);
        console.log('📈 Number of products:', data.length);
        setAll_Product(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('❌ Error fetching products:', error);
        console.error('🔍 Error details:', error.message);
        setError(error.message);
        setLoading(false);
      });
  };
  
  // Fetch products when component mounts or auth token changes
  useEffect(() => {
    if (authToken !== null) {
      fetchProducts();
    }
  }, [authToken]);

  // Debug: Log state changes
  useEffect(() => {
    console.log('🔄 all_product state updated:', all_product);
  }, [all_product]);

  const addToCart = (itemId) => {
    setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if(localStorage.getItem('auth-token')){
      fetch('http://localhost:4000/addtocart',{
        method:'POST',
        headers:{
          Accept:'application/json', // Fixed: Changed 'appliction/json' to 'application/json'
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json',
        },
        body:JSON.stringify({"itemId":itemId})
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error('Error adding to cart:', error));
    }
    console.log(`➕ Added item ${itemId} to cart`);
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(localStorage.getItem('auth-token')){
      fetch('http://localhost:4000/removefromcart',{
        method:'POST',
        headers:{
          Accept:'application/json', // Fixed: Changed 'appliction/json' to 'application/json'
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json',
        },
        body:JSON.stringify({"itemId":itemId})
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error('Error removing from cart:', error));
    }
    console.log(`➖ Removed item ${itemId} from cart`);
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(product => product.id === Number(item));
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        } else {
          console.warn(`⚠️ Product with id ${item} not found in all_product`);
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };

  const contextValue = {
    all_products: all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    loading,
    error,
    fetchProducts // Add this so components can manually refresh
  }
  
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;