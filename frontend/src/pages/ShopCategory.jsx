import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import Item from '../components/Items/item'

export const ShopCategory = (props) => {
  const { all_products } = useContext(ShopContext);
  
  return (
    <div className='shop-category'>
      <div className="shop-category-banner">
        <img src={props.banner} alt="Category Banner" className="banner-image" />
        <div className="banner-overlay">
          <h1 className="category-title">{props.category}</h1>
        </div>
      </div>
      
      <div className="shop-category-content">
        <div className="shop-category-left">
         
          <div className="category-info">
            <h2>Explore Our {props.category} Collection</h2>
            <p>Discover the latest trends and timeless classics in our curated selection.</p>
          </div>
        </div>
        
        <div className="shop-category-right">
          <div className="products-grid">
            {all_products?.filter(product =>
              props.category.toLowerCase() === 'kid' || props.category.toLowerCase() === 'kid'
                ? product.category === 'kid' // Show all 'kid' products for kids section
                : product.category === props.category
            )
              // Only limit to 6 if not kids section
              .filter((product, idx, arr) =>
                (props.category.toLowerCase() === 'kid' || props.category.toLowerCase() === 'kids') ? true : idx < 6
              )
              .map(product => (
                <Item 
                  key={product.id} 
                  id={product.id} 
                  image={product.image} 
                  name={product.name} 
                  new_price={product.new_price} 
                  old_price={product.old_price} 
                />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopCategory;