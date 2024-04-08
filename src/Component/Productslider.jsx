'use client'
import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../css/productslider.module.css";


export default function Productslider() {
    var settings = {
      dots: false,
      infinite: true,
      arrows:true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
           slidesToShow: 3,
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
            <div className={styles.product_slider}>
                <Slider {...settings} >
            
                        <div className={styles.product_slider_item}>
                            <a href="/product/socks-1">
                                <img src="../../images/product-slider-img-1.png"/>  
                            </a>
                        </div>
                        <div className={styles.product_slider_item}>
                            <a href="/product/socks-2">
                                <img src="../../images/product-slider-img-2.png"/>  
                            </a>
                        </div>
                        <div className={styles.product_slider_item}>
                            <a href="/product/socks-3">
                                <img src="../../images/product-slider-img-3.png"/>  
                            </a>
                        </div>
                        <div className={styles.product_slider_item}>
                            <a href="/product/socks-4">
                                <img src="../../images/product-slider-img-4.png"/>  
                            </a>
                        </div>
                        <div className={styles.product_slider_item}>
                            <a href="/product/socks-5">
                                <img src="../../images/product-slider-img-1.png"/>  
                            </a>
                        </div>
                        <div className={styles.product_slider_item}>
                            <a href="/product/socks-6">
                                <img src="../../images/product-slider-img-2.png"/>  
                            </a>
                        </div>
                


            </Slider>
        </div>
      </div>
    );
  }