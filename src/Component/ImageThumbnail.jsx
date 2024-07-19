import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const ImageThumbnail = ({ imageHtml ,variationData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [mainSrc, setMainSrc] = useState('');
    // const size = variationData.length > 0  && variationData[0]

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

            {/* {size?.is_pre_order === "yes" && (
                <div style={{
                    display: 'inline-block',
                    backgroundColor: '#01426a',
                    color: 'white',
                    fontSize: 'smaller',
                    padding: '2px 5px',
                    marginLeft: '5px',
                    borderRadius: '3px',
                    fontWeight: 600,
                    textTransform : "uppercase"

                }}>
                    Pre-Order
                </div>
            )} */}

        </div>
    );
};

export default ImageThumbnail;
