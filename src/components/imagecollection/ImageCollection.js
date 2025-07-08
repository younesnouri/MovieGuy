import React from 'react';
import './imagecollection.css'; // Make sure to create this CSS file

export const ImageCollection = ({ images }) => {
  return (
    <div className="image-collection">
      {images.map((image, index) => (
        <div key={index} className="image-item">
          <img src={image.src} alt={image.alt} />
        </div>
      ))}
    </div>
  );
};


