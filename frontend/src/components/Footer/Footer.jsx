import React from 'react'
import './Footer.css'
import logo_full from '../Assets/logo_big.png'
import './Footer.css'
import instagram from '../Assets/instagram_icon.png'
import pintrest from '../Assets/pintester_icon.png'
import whatsapp from '../Assets/whatsapp_icon.png'
export const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={logo_full} alt="" />
            <p>SHOPPER</p>
        </div>
        <ul className="footer-links">
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icon"></div>
        <div className="footer-icon-container">
            <div className="footer-icon-container-icon">
                <img src={instagram} alt="" />
            </div>
            <div className="footer-icon-container-icon">
                <img src={pintrest} alt="" />
            </div>
            <div className="footer-icon-container-icon">
                <img src={whatsapp} alt="" />
            </div>
            <div className="footer-copyright">
                <hr />
                <p>Copyright @ 2025 - All Right Reserved</p>
            </div>
        </div>
    </div>
  )
}
export default Footer;