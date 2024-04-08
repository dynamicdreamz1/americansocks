'use client'
import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../css/relatedproductslider.module.css";

export default function Relatedproductslider() {
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
            breakpoint: 600,
            settings: {
             slidesToShow: 1,
            }
           }
        ]
      };
      return (
          <div className="container">
            <div className={styles.related_product_slider}>
              <Slider {...settings} >

                {/* Item 1 */}
                <div className={styles.related_product_item}>
                    <a href="/product/t-shirt">
                        <img src="../../images/shirt-1.png"/>  
                    </a>
                </div>

                {/* Item 2 */}
                <div className={styles.related_product_item}>
                    <a href="/product/t-shirt">
                        <img src="../../images/shirt-2.png"/>  
                    </a>
                </div>

                {/* Item 3 */}
                <div className={styles.related_product_item}>
                    <a href="/product/t-shirt">
                        <img src="../../images/shirt-3.png"/>  
                    </a>
                </div>

                {/* Item 1 */}
                <div className={styles.related_product_item}>
                    <a href="/product/t-shirt">
                        <img src="../../images/shirt-1.png"/>  
                    </a>
                </div>

                {/* Item 2 */}
                <div className={styles.related_product_item}>
                    <a href="/product/t-shirt">
                        <img src="../../images/shirt-2.png"/>  
                    </a>
                </div>
              </Slider>
          </div>
        </div>
      );
    }