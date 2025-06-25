import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png';
import arrow_icon from '../Assets/arrow.png'; // You said cart_icon.png, not arrow_icon.png
import hero_image from '../Assets/hero_image.png';


export const Hero = () => {
  return (
    <div className='hero'>
       <div className="hero-left">
        <h2>NEW ARRIVALS</h2>
        <div>
            <div className="hero-hand-icon">
        <p>New</p>
        <img src={hand_icon} alt="" />
            </div>
           
            <p>Collections</p>
            <p>For Everyone</p>
            
        </div>
        <div className="hero-latest-btn">
            <div>Latest Collection</div>
            <img src={arrow_icon} alt="" />
        </div>
       </div>
       <div className="hero-right"></div>
       <img src={hero_image} alt="" />
    </div>
  )
}
export default Hero;