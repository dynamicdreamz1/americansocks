'use client'
import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../css/productslider.module.css";
import { productsliderimg1, productsliderimg2, productsliderimg3, productsliderimg4} from "../assets/Images/index"


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
                            <img src={productsliderimg1}/>  
                        </a>
                    </div>
                    <div className={styles.product_slider_item}>
                        <a href="/product/socks-2">
                        <img src={productsliderimg2}/>  
                        </a>
                    </div>
                    <div className={styles.product_slider_item}>
                        <a href="/product/socks-3">
                            <img src={productsliderimg3}/>  
                        </a>
                    </div>
                    <div className={styles.product_slider_item}>
                        <a href="/product/socks-4">
                            <img src={productsliderimg4}/>  
                        </a>
                    </div>
                    <div className={styles.product_slider_item}>
                        <a href="/product/socks-5">
                            <img src={productsliderimg1}/>  
                        </a>
                    </div>
                    <div className={styles.product_slider_item}>
                        <a href="/product/socks-6">
                            <img src={productsliderimg2}/>   
                        </a>
                    </div>
        
            </Slider>
        </div>
      </div>
    );
  }