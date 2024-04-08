'use client'
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../css/productdetails.module.css";

export default function Productdeatils() {
  
  var settings = {
    dots: false,
    infinite: true,
    arrows:false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
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
    <div className="container">
      <div className={styles.product_detail_wrapper}>
        <div className={styles.product_detail_left}>
          <div className="container">
              {/* Main Product */}
            <div className={styles.product_nav_main}>
              <div className={styles.product_item}>
                    <a href="#">
                        <img src="../../images/tshirt-1.png"/>  
                    </a>
                </div>
            </div>
            {/* Thumb Slider */}
            <div className={styles.product_thumb_slider}>
              <Slider {...settings} >
                <div className={styles.product_slider_item}>
                    <a href="#">
                        <img src="../../images/tshirt-1.png"/>  
                    </a>
                </div>
                <div className={styles.product_slider_item}>
                    <a href="#">
                        <img src="../../images/tshirt-2.png"/>  
                    </a>
                </div>
                <div className={styles.product_slider_item}>
                    <a href="#">
                        <img src="../../images/tshirt-3.png"/>  
                    </a>
                </div>
                <div className={styles.product_slider_item}>
                    <a href="#">
                        <img src="../../images/tshirt-1.png"/>  
                    </a>
                </div>

              </Slider>
              </div>
            </div>
        </div>
        <div className={styles.product_detail_right}>
              <h3 className={styles.product_title}>Tacos & Vatos - T-Shirt</h3>
              <p className={styles.product_price}>12,00€</p>
              <div className={styles.product_dec}>
                <p>White Unisex T-Shirt</p>
                <p>Heritage Fit</p>
                <p>Front and Back Full Color Print</p>
                <p>Sizes S, M, L, XL & XXL - Size Chart</p>
                <p>Composition: 100% Cotton</p>
              </div>
              {/* Product Size and Price table */}
              <div className={styles.price_table}>
                <table>
                  <tbody>
                  <tr className={styles.price_table_head}>
                    <th>Sizes</th>
                    <th>S</th>
                    <th>M</th>
                    <th>L</th>
                    <th>XL</th>
                    <th>XXL</th>
                  </tr>

                  <tr className={styles.price_table_price}>
                    <td>Price</td>
                    <td>
                      <div className={`${styles.price} ${styles.blue}`}>
                        <input type="number" id="quantity" name="quantity" placeholder="0"/>
                      </div>
                    </td>

                    <td>
                      <div className={`${styles.price} ${styles.green}`}>
                        <input type="number"  name="quantity" id="quantity" class="txt" placeholder="0"/>
                      </div>
                    </td>

                    <td>
                      <div className={`${styles.price} ${styles.orange}`}>
                        <input type="number"  name="quantity" id="quantity" class="txt" placeholder="0"/>
                      </div>
                    </td>

                    <td>
                      <div className={`${styles.price} ${styles.green}`}>
                        <input type="number"  name="quantity" id="quantity" class="txt" placeholder="0"/>
                      </div>
                    </td>

                    <td>
                      <div className={`${styles.price} ${styles.red}`}>
                        <input type="number"  name="quantity" id="quantity" class="txt" placeholder="0"/>
                      </div>
                    </td>
                  </tr>
                  </tbody>

                </table>
              </div>
              {/* Product Total */}
              <div className={styles.product_item_detail}>
                <div className={styles.product_item_left}>
                    <p>items: <span>0</span></p>
                    <p>Total: <span>0,00€</span></p>
                    <div className={styles.product_order}>
                      <div className={styles.product_order_item}>
                        <div className={`${styles.circle} ${styles.greeen}`}></div>
                        <p>Disponible</p>
                      </div>

                      <div className={styles.product_order_item}>
                        <div className={`${styles.circle} ${styles.red}`}></div>
                        <p>No Disponible </p>
                      </div>

                      <div className={styles.product_order_item}>
                        <div className={`${styles.circle} ${styles.orange}`}></div>
                        <p>Last Units</p>
                      </div>

                      <div className={styles.product_order_item}>
                        <div className={`${styles.circle} ${styles.yellow}`}></div>
                        <p>Back-order</p>
                      </div>

                      <div className={styles.product_order_item}>
                        <div className={`${styles.circle} ${styles.blue}`}></div>
                        <p>Pre-order</p>
                      </div>
                    </div>
                </div>
                <div className={styles.product_item_right}>
                  <a href="" className={styles.btn}>add to cart</a>
                </div>
              </div>

              {/* Product Sku */}
              <div className={styles.product_item_sku}>
                  <p><span>SKU</span>ASG104</p>
                  <p><span>Categories</span>Clothing, FW23</p>
              </div>

              {/* Social Share */}
              <div className={styles.social_share}>
                <p>Share</p>
                <div className={styles.social_share_wrap}>
                  <a href="">
                    <img src="../../images/facebook.png"/>
                  </a>
                  <a href="">
                      <img src="../../images/twitter.png"/>
                  </a>
                  <a href="">
                      <img src="../../images/pinterest-logo.png"/>
                  </a>
                  <a href="">
                      <img src="../../images/linkedin.png"/>
                  </a>
                  <a href="">
                      <img src="../../images/telegram.png"/>
                  </a>
                </div>
        
              </div>
        </div>
      </div>
    </div>
  )
}
