import React from 'react'
import './Popular.css'
import data_product from '../Assets/data'
import Item from '../Items/item'
export const Popular = () => {
  return (
    <div className='popular'>
        <div className="popular-left">
            <h1>Popular in Women</h1>
            <hr />
            <div className="popular-item">
                {data_product.map((item,index)=>(
                  <Item key={index} image={item.image} name={item.name} newPrice={item.new_price} oldPrice={item.old_price} />
                ))}
            </div>
        </div>
        <div className="popular-right"></div>
    </div>
  )
}
export default Popular;