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
    <div className="container">
      <div className="product_detail_wrapper">
        <div className="product_detail_left">
          <div className="container">
              {/* Main Product */}
            <div className="product_nav_main">
              <div className="product_item">
                    <a href="#">
                        <img src={tshirt1}/>  
                    </a>
                </div>
            </div>
            {/* Thumb Slider */}
            <div className="product_thumb_slider">
              <Slider {...settings} >
                <div className="product_slider_item">
                    <a href="#">
                    <img src={tshirt1}/>  
                    </a>
                </div>
                <div className="product_slider_item">
                    <a href="#">
                    <img src={tshirt2}/>  
                    </a>
                </div>
                <div className="product_slider_item">
                    <a href="#">
                    <img src={tshirt3}/>  
                    </a>
                </div>
                <div className="product_slider_item">
                    <a href="#">
                      <img src={tshirt1}/>  
                    </a>
                </div>

              </Slider>
              </div>
            </div>
        </div>
        <div className="product_detail_right">
              <h3 className="product_title">Tacos & Vatos - T-Shirt</h3>
              <p className="product_price">12,00€</p>
              <div className="product_dec">
                <p>White Unisex T-Shirt</p>
                <p>Heritage Fit</p>
                <p>Front and Back Full Color Print</p>
                <p>Sizes S, M, L, XL & XXL - Size Chart</p>
                <p>Composition: 100% Cotton</p>
              </div>
              {/* Product Size and Price table */}
              <div className="price_table">
                <table>
                  <tbody>
                  <tr className="price_table_head">
                    <th>Sizes</th>
                    <th>S</th>
                    <th>M</th>
                    <th>L</th>
                    <th>XL</th>
                    <th>XXL</th>
                  </tr>

                  <tr className="price_table_price">
                    <td>Price</td>
                    <td>
                      <div className="price blue">
                        <input type="number" id="quantity" name="quantity" placeholder="0"/>
                      </div>
                    </td>

                    <td>
                      <div className="price green">
                        <input type="number"  name="quantity" id="quantity" className="txt" placeholder="0"/>
                      </div>
                    </td>

                    <td>
                      <div className="price orange">
                        <input type="number"  name="quantity" id="quantity" className="txt" placeholder="0"/>
                      </div>
                    </td>

                    <td>
                      <div className="price green">
                        <input type="number"  name="quantity" id="quantity" className="txt" placeholder="0"/>
                      </div>
                    </td>

                    <td>
                      <div className="price red">
                        <input type="number"  name="quantity" id="quantity" className="txt" placeholder="0"/>
                      </div>
                    </td>
                  </tr>
                  </tbody>

                </table>
              </div>
              {/* Product Total */}
              <div className="product_item_detail">
                <div className="product_item_left">
                    <p>items: <span>0</span></p>
                    <p>Total: <span>0,00€</span></p>
                    <div className="product_order">
                      <div className="product_order_item">
                        <div className="circle greeen"></div>
                        <p>Disponible</p>
                      </div>

                      <div className="product_order_item">
                        <div className="circle  red"></div>
                        <p>No Disponible </p>
                      </div>

                      <div className="product_order_item">
                        <div className="circle orange"></div>
                        <p>Last Units</p>
                      </div>

                      <div className="product_order_item">
                        <div className="circle yellow"></div>
                        <p>Back-order</p>
                      </div>

                      <div className="product_order_item">
                        <div className="circle blue"></div>
                        <p>Pre-order</p>
                      </div>
                    </div>
                </div>
                <div className="product_item_right">
                  <a href="" className="btn">add to cart</a>
                </div>
              </div>

              {/* Product Sku */}
              <div className="product_item_sku">
                  <p><span>SKU</span>ASG104</p>
                  <p><span>Categories</span>Clothing, FW23</p>
              </div>

              {/* Social Share */}
              <div className="social_share">
                <p>Share</p>
                <div className="social_share_wrap">
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
