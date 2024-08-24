import React, { useState } from 'react';
import { IoCopyOutline } from 'react-icons/io5';
import { FaTimes } from 'react-icons/fa'; // Import cross icon
import './Share.css';
import { assets } from '../../assets/assets';
import { RxCross1 } from "react-icons/rx";

const Share = ({ show, onClose }) => {
  const [copyText, setCopyText] = useState(window.location.href); // Initialize with current URL

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText).then(() => {
      alert('Link copied to clipboard!'); // Optionally, provide feedback to the user
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  if (!show) return null;  // Don't render if show is false

  return (
    <div className="share-overlay">
      <div className="share-popup">
        <div className="close-icon" onClick={onClose}>
          <RxCross1 />
        </div>
        <h3 className="share-title">Share Recipe</h3>
        <div className="share-icons-container">
          <div className="share-icons">
            <div className="share-icon-wrapper">
              <a href="https://www.facebook.com/sharer/sharer.php?u=YOUR_URL" target="_blank" rel="noopener noreferrer">
                <img src={assets.facebook} alt="Facebook" className='share-img'/>
                <span className="icon-label">Facebook</span>
              </a>
            </div>
            <div className="share-icon-wrapper">
              <a href="https://wa.me/?text=YOUR_TEXT" target="_blank" rel="noopener noreferrer">
                <img src={assets.whatsapp} alt="Whatsapp" className='share-img'/>
                <span className="icon-label">Whatsapp</span>
              </a>
            </div>
            <div className="share-icon-wrapper">
              <a href="https://www.pinterest.com/pin/create/button/?url=YOUR_URL" target="_blank" rel="noopener noreferrer">
                <img src={assets.pinterest} alt="Pinterest" className='share-img'/>
                <span className="icon-label">Pinterest</span>
              </a>
            </div>
            <div className="share-icon-wrapper">
              <a href="https://twitter.com/intent/tweet?url=YOUR_URL&text=YOUR_TEXT" target="_blank" rel="noopener noreferrer">
                <img src={assets.x} alt="Twitter" className='share-img'/>
                <span className="icon-label">Twitter</span>
              </a>
            </div>
            <div className="share-icon-wrapper">
              <a href="mailto:?subject=YOUR_SUBJECT&body=YOUR_BODY" target="_blank" rel="noopener noreferrer">
                <img src={assets.email} alt="Email" className='share-img-email'/>
                <span className="icon-label">Email</span>
              </a>
            </div>
            <div className="share-icon-wrapper">
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <img src={assets.instagram} alt="Instagram" className='share-img-insta'/>
                <span className="icon-label">Instagram</span>
              </a>
            </div>
          </div>
        </div>
        <div className="share-link">
          <input type="text" value={copyText} readOnly />
          <button className="copy-button" onClick={handleCopy}>
            <IoCopyOutline /> Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Share;
