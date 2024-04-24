import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';

export default function Relatedproductslider({ relatedProductList }) {
  const navigate = useNavigate();

  var settings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        }
      }
    ]
  };


  const redirectShopDetail = (product) => {
    // navigate('/shopdetails', { state: { product: product } });
  };
  
  return (
    <div className="container">
      <div className="related_product_slider">
        <Slider {...settings} >

          {relatedProductList?.related_products.map(product => (
            <div onClick={()=>redirectShopDetail(product)}  className="related_product_item" key={product.id}>
              <img src={product?.image} alt={product?.name} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}