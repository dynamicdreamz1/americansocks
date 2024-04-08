'use client'
import React from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { tshirt1,tshirt2,tshirt3,facebook,twitter,pinterest,linkedin,telegram} from "../assets/Images/index"


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
    <div class="container">
      <div class="product_detail_wrapper">
        <div class="product_detail_left">
          <div class="container">
              {/* Main Product */}
            <div class="product_nav_main">
              <div class="product_item">
                    <a href="#">
                        <img src={tshirt1}/>  
                    </a>
                </div>
            </div>
            {/* Thumb Slider */}
            <div class="product_thumb_slider">
              <Slider {...settings} >
                <div class="product_slider_item">
                    <a href="#">
                    <img src={tshirt1}/>  
                    </a>
                </div>
                <div class="product_slider_item">
                    <a href="#">
                    <img src={tshirt2}/>  
                    </a>
                </div>
                <div class="product_slider_item">
                    <a href="#">
                    <img src={tshirt3}/>  
                    </a>
                </div>
                <div class="product_slider_item">
                    <a href="#">
                      <img src={tshirt1}/>  
                    </a>
                </div>

              </Slider>
              </div>
            </div>
        </div>
        <div class="product_detail_right">
              <h3 class="product_title">Tacos & Vatos - T-Shirt</h3>
              <p class="product_price">12,00€</p>
              <div class="product_dec">
                <p>White Unisex T-Shirt</p>
                <p>Heritage Fit</p>
                <p>Front and Back Full Color Print</p>
                <p>Sizes S, M, L, XL & XXL - Size Chart</p>
                <p>Composition: 100% Cotton</p>
              </div>
              {/* Product Size and Price table */}
              <div class="price_table">
                <table>
                  <tbody>
                  <tr class="price_table_head">
                    <th>Sizes</th>
                    <th>S</th>
                    <th>M</th>
                    <th>L</th>
                    <th>XL</th>
                    <th>XXL</th>
                  </tr>

                  <tr class="price_table_price">
                    <td>Price</td>
                    <td>
                      <div class="price blue">
                        <input type="number" id="quantity" name="quantity" placeholder="0"/>
                      </div>
                    </td>

                    <td>
                      <div class="price green">
                        <input type="number"  name="quantity" id="quantity" class="txt" placeholder="0"/>
                      </div>
                    </td>

                    <td>
                      <div class="price orange">
                        <input type="number"  name="quantity" id="quantity" class="txt" placeholder="0"/>
                      </div>
                    </td>

                    <td>
                      <div class="price green">
                        <input type="number"  name="quantity" id="quantity" class="txt" placeholder="0"/>
                      </div>
                    </td>

                    <td>
                      <div class="price red">
                        <input type="number"  name="quantity" id="quantity" class="txt" placeholder="0"/>
                      </div>
                    </td>
                  </tr>
                  </tbody>

                </table>
              </div>
              {/* Product Total */}
              <div class="product_item_detail">
                <div class="product_item_left">
                    <p>items: <span>0</span></p>
                    <p>Total: <span>0,00€</span></p>
                    <div class="product_order">
                      <div class="product_order_item">
                        <div class="circle greeen"></div>
                        <p>Disponible</p>
                      </div>

                      <div class="product_order_item">
                        <div class="circle  red"></div>
                        <p>No Disponible </p>
                      </div>

                      <div class="product_order_item">
                        <div class="circle orange"></div>
                        <p>Last Units</p>
                      </div>

                      <div class="product_order_item">
                        <div class="circle yellow"></div>
                        <p>Back-order</p>
                      </div>

                      <div class="product_order_item">
                        <div class="circle blue"></div>
                        <p>Pre-order</p>
                      </div>
                    </div>
                </div>
                <div class="product_item_right">
                  <a href="" class="btn">add to cart</a>
                </div>
              </div>

              {/* Product Sku */}
              <div class="product_item_sku">
                  <p><span>SKU</span>ASG104</p>
                  <p><span>Categories</span>Clothing, FW23</p>
              </div>

              {/* Social Share */}
              <div class="social_share">
                <p>Share</p>
                <div class="social_share_wrap">
                  <a href="">
                    <img src={facebook}/>  
                  </a>
                  <a href="">
                    <img src={twitter}/>  
                  </a>
                  <a href="">
                    <img src={pinterest}/>  
                  </a>
                  <a href="">
                    <img src={linkedin}/>  
                  </a>
                  <a href="">
                    <img src={telegram}/>  
                  </a>
                </div>
        
              </div>
        </div>
      </div>
    </div>
  )
}
