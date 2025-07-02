import React, { useContext } from 'react'
import './NewCollections.css'
import { ShopContext } from '../../Context/ShopContext'
import Item from '../Items/item'

export const NewCollections = () => {
  const { all_products } = useContext(ShopContext);
  
  // Get products 5-12 for the new collections section
  const newCollectionsProducts = all_products ? all_products.slice(4, 12) : [];
  
  return (
    <div className='new-collections'>
      <h1>New Collections</h1>
      <hr />
      <div className="grid">
        {newCollectionsProducts.map((product) => (
          <Item
            key={product.id}
            id={product.id}
            image={product.image}
            name={product.name}
            new_price={product.new_price}
            old_price={product.old_price}
          />
        ))}
      </div>
    </div>
  )
}
export default NewCollections;
