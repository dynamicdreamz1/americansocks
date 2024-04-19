'use client'
import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {shirt1,shirt2,shirt3} from "../assets/Images/index"

export default function Relatedproductslider({product}) {
    var settings = {
        dots: false,
        infinite: true,
        arrows:true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
             slidesToShow: 3,
            }
          },
          {
            breakpoint: 991,
            settings: {
             slidesToShow: 2,
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
          <div className="container">
            <div className="related_product_slider">
              <Slider {...settings} >

                <div className="related_product_item">
                    <a href="/product/t-shirt">
                    <img src={shirt1}/>   
                    </a>
                </div>


                <div className="related_product_item">
                    <a href="/product/t-shirt">
                      <img src={shirt2}/>   
                    </a>
                </div>

                <div className="related_product_item">
                    <a href="/product/t-shirt">
                     <img src={shirt3}/>   
                    </a>
                </div>

                <div className="related_product_item">
                    <a href="/product/t-shirt">
                    <img src={shirt1}/>   
                    </a>
                </div>

                <div className="related_product_item">
                    <a href="/product/t-shirt">
                     <img src={shirt2}/>   
                    </a>
                </div>
              </Slider>
          </div>
        </div>
      );
    }