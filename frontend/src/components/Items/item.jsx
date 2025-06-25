import React from 'react'
import './Item.css'

const Item = (props) => {
  return (
    <div className="item-card">
        <img className="item-image" src={props.image} alt={props.name} />
        <p className="item-name">{props.name}</p>
        <div className="item-prices">
            <span className="item-price-new">${props.newPrice}</span>
            <span className="item-price-old">${props.oldPrice}</span>
        </div>
        <button className="item-btn">Add to Cart</button>
    </div>
  )
}

export default Item;
