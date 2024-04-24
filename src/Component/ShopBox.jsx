import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductSlider = ({ images }) => {
    var settings = {
        dots: false,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: true,
        vertical:true,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <Slider {...settings}>
            {images.map((image) => (
                <div className='product_image' key={image.id}>
                    {/* <img src={image.urls.woocommerce_thumbnail} alt={image.name} /> */}
                    <div dangerouslySetInnerHTML={{ __html: image.urls.woocommerce_thumbnail }} />

              
                </div>
            ))}
        </Slider>
    );
}


export default ProductSlider