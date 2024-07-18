import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const ImageThumbnail = ({ imageHtml }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mainSrc, setMainSrc] = useState('');

  const handleImageClick = (event) => {
    event.preventDefault(); // Prevent default link behavior
    const imgElement = document.createElement('div');
    imgElement.innerHTML = imageHtml;
    const imgSrc = imgElement.querySelector('img').getAttribute('data-large_image');
    setMainSrc(imgSrc);
    setIsOpen(true);
  };

  return (
    <div>
      <div 
        data-label="Image" 
        dangerouslySetInnerHTML={{ __html: imageHtml }} 
        onClick={handleImageClick}
        style={{ cursor: 'pointer' }}
      />
      {isOpen && (
        <Lightbox
          mainSrc={mainSrc}
          onCloseRequest={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ImageThumbnail;
