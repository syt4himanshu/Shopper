import React, { useEffect, useState } from 'react';
import './Popular.css';
import Item from '../Items/item';

export const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/popularinwomen')
      .then((response) => response.json())
      .then((data) => setPopularProducts(data))
      .catch((error) => console.error("Error fetching popular products:", error));
  }, []);

  return (
    <div className='popular'>
      <div className="popular-left">
        <h1>Popular in Women</h1>
        <hr />
        <div className="popular-item">
          {popularProducts.map((item, index) => (
            <Item
              key={index}
              id={item.id}
              image={item.image}
              name={item.name}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
        </div>
      </div>
      <div className="popular-right"></div>
    </div>
  );
};

export default Popular;
