import React from 'react'
import './RelatedProducts.css'
import data_product from "../Assets/data"
import Item from "../Items/item"

export const RelatedProducts = () => {
  return (
    <section className='related-products-section'>
      <div className="related-products-container">
        <div className="section-header">
          <h2 className="section-title">Related Products</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">Discover more items you might love from our curated collection</p>
        </div>
        
        <div className="products-grid">
          {data_product.map((product) => (
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
    </section>
  )
}

export default RelatedProducts;