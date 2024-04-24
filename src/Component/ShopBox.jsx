import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductSlider = ({ images }) => {
    var settings = {
        dots: false,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: false,
        centerMode: true,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    };

    return (
        <Slider {...settings}>
            {images.map((image) => (
                <div className='product_image' key={image.id}>
                    <img src={image.urls.woocommerce_thumbnail} alt={image.name} />
                    
                </div>
            ))}
        </Slider>
    );
}


export default ProductSlider