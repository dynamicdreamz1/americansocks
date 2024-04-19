'use client'
import React, { useState } from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { facebook, twitter, pinterest, linkedin, telegram } from "../assets/Images/index"


export default function Productdeatils({ product, variationsList }) {

  const[productImage,setProductImages]=useState(product?.images[0]?.src)

  const categoryNames = product?.categories.map(category => category.name);
  const sizes = variationsList?.map(variation => variation.attributes.find(attr => attr.name === "Size").option);

  var settings = {
    dots: false,
    infinite: true,
    arrows: false,
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

  const handleProductImages = (imageUrl) =>{
    setProductImages(imageUrl)

  }
  return (
    <div className="container">
      <div className="product_detail_wrapper">
        <div className="product_detail_left">
          <div className="container">
            <div className="product_nav_main">
              <div className="product_item">
                <a href="#">
                  <img src={productImage} alt={product?.images[0].alt} />
                </a>
              </div>
            </div>
            <div className="product_thumb_slider">

              <Slider {...settings}>
                {product.images.length > 0 && product.images.map((relatedProduct, index) => (
                  <div className="product_slider_item" key={index} onClick={()=>handleProductImages(relatedProduct.src)}>
                    <img src={relatedProduct.src} alt={relatedProduct.alt} />
                  </div>
                ))}
              </Slider>

            </div>
          </div>
        </div>
        <div className="product_detail_right">
          <h3 className="product_title">{product.name}</h3>
          <p className="product_price" dangerouslySetInnerHTML={{ __html: product?.price_html }} />
          <div className="product_dec">
            <p dangerouslySetInnerHTML={{ __html: product?.short_description }} />
          </div>

          {
            variationsList.length > 0 &&
            <div className="price_table">
              <table>
                <tbody>
                  <tr className="price_table_head">
                    <th>Sizes</th>
                    {sizes.length > 0 && sizes.map((size, index) => (
                      <th key={index}>{size}</th>
                    ))}
                  </tr>

                  <tr className="price_table_price">
                    <td>Unit</td>
                    {/* Render input boxes for each size */}
                    {sizes.map((size, index) => (
                      <td key={index}>
                        <div className={`price ${index % 2 === 0 ? 'green' : 'blue'}`}>
                          <input type="number" name={`quantity_${index}`} id={`quantity_${index}`} className="txt" placeholder="0" />
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>

              </table>
            </div>

          }


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
            <p><span>SKU</span>{product.sku}</p>
            <p><span>Categories</span>{categoryNames.join(', ')}</p>
          </div>

          {/* Social Share */}
          <div className="social_share">
            <p>Share</p>
            <div className="social_share_wrap">
              <a href="">
                <img src={facebook} />
              </a>
              <a href="">
                <img src={twitter} />
              </a>
              <a href="">
                <img src={pinterest} />
              </a>
              <a href="">
                <img src={linkedin} />
              </a>
              <a href="">
                <img src={telegram} />
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
