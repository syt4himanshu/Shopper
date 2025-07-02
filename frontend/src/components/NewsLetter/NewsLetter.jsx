import React from 'react'
import './NewsLetter.css'

export const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>Get Exclusive Offers On Your Email</h1>
        <p>Subscribe for new arrivals and special offers</p>
        <div className="form">
            <input type="text" placeholder='Enter your email' />
            <button>Subscribe</button>
        </div>
    </div>
  )
}
export default NewsLetter;