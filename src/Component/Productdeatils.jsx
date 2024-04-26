import React, { useState } from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { arrowprev } from "../assets/Images/index"
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { calculateTotalQuantity } from "../Common/function";
import { addToCart, addToCartProducts } from "../services/order";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";


export default function Productdeatils({ product, variationsList }) {

  const [productImage, setProductImages] = useState(product?.images[0]?.urls.woocommerce_single)
  const [selectedItems, setSelectedItems] = useState([]);
  const totalQuantity = calculateTotalQuantity(selectedItems, product.id);
  const [isZoomed, setIsZoomed] = useState(false);
  const [singleTotalQuantity, setSingleTotalQuantity] = useState();



  const categoryNames = product?.categories.map(category => category.name);
  const sizes = variationsList?.map(variation => variation.attributes?.pa_size);
  const totalPrice = (variationsList && variationsList?.length === 0) ? parseFloat(product.price) : totalQuantity * parseFloat(product.price);


  var settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 5,
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

  const handleProductImages = (imageUrl) => {
    setProductImages(imageUrl)

  }

  const handleInputChange = (event, data, selectedSize, item) => {
    const { value } = event.target;
    let intValue = parseInt(value);
    const stockNumber = parseInt(data?.stock_quantity);

    if (intValue > stockNumber && item.backordered === false) {
      intValue = 0;
    }
    // Check if the variation is already selected
    const isSelected = selectedItems.some(selectedItem => selectedItem.variation_id === data.id && selectedItem.selectedSize === selectedSize);

    if (intValue === 0) {
      // If the quantity is 0, remove the object from selectedItems
      const updatedSelectData = selectedItems.filter(selectedItem => !(selectedItem.variation_id === data.id && selectedItem.selectedSize === selectedSize));
      setSelectedItems(updatedSelectData);
    } else {
      if (isSelected) {
        // If already selected, update the quantity
        const updatedSelectData = selectedItems.map(selectedItem => {
          if (selectedItem.variation_id === data.id && selectedItem.selectedSize === selectedSize) {
            return {
              ...selectedItem,
              quantity: intValue
            };
          }
          return selectedItem;
        });
        setSelectedItems(updatedSelectData);
      } else {
        // If not selected and quantity is greater than 0, add to selectedItems
        if (intValue > 0) {
          setSelectedItems(prevSelectData => [...prevSelectData, {
            variation_id: data.id,
            selectedSize: selectedSize,
            quantity: intValue,
            product_id: item.id
          }]);
        }
      }
    }
  };

  const handleSubmit = async (item) => {
    try {
      let result;
      if (item && singleTotalQuantity) {
        const object = {
          quantity: singleTotalQuantity,
          action: 'wcpt_add_to_cart',
          product_id: item.id
        }
        result = await addToCart(object);

      } else {
        result = await addToCartProducts(selectedItems.length > 0 && selectedItems);
      }

      if (result.cart_hash) {
        toast.success("Product added to cart successfully!");
      } else {
        toast.error("Failed to add product to cart.");
      }
    } catch (error) {
      toast.error("Error occurred while adding product to cart. Please select Quantity");
    }
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const handleInputChangeSingleValue = (e) => {
    let quantity = parseInt(e.target.value);
    if (isNaN(quantity) || quantity < 1) {
      quantity = "";
    }
    setSingleTotalQuantity(quantity);
  };

  
  return (
    <div className="container">
      <ToastContainer />
      <Link to="/shop" >
        <div className="back_btn">
          <img src="https://dddemo.net/wordpress/2024/americansocks/wp-content/uploads/2024/04/arrow-prev.png" alt="back_logo" />

        </div>
      </Link>
      <div className="product_detail_wrapper">
        <div className="product_detail_left">
          <div className="container">

            <div className="product_detail_slider">
              <div className="product_nav_main">

                <div className={`product_item ${isZoomed ? "zoomed" : ""}`} onClick={toggleZoom}>
                  <div className="product_item_image" dangerouslySetInnerHTML={{ __html: productImage }} />
                </div>
              </div>
              <div className="product_thumb_slider">

                <Slider {...settings}>
                  {product.images.length > 0 && product.images.map((relatedProduct, index) => (
                    <div key={index} onClick={() => handleProductImages(relatedProduct.urls.woocommerce_single)}>
                      <div className="product_slider_item" dangerouslySetInnerHTML={{ __html: relatedProduct.urls.woocommerce_thumbnail }} />
                    </div>
                  ))}
                </Slider>

              </div>
            </div>

          </div>
        </div>
        <div className="product_detail_right">
          <h3 className="product_title">{product.name}</h3>
          <div className="price_table">
            <table>
              <tbody className={variationsList?.length === 0 ? "size_blank" : ""}>
                {
                  variationsList?.length > 0 &&
                  <>
                    <tr className="price_table_head">
                      <th>Sizes</th>
                      {sizes.length > 0 && sizes.map((size, index) => (
                        <th key={index}>{size.toUpperCase()}</th>
                      ))}
                    </tr><tr className="price_table_price">
                      <td>Unit</td>
                      {/* Render input boxes for each size */}
                      {variationsList.map((data, index) => {
                        return (
                          <td key={index}>
                            <div className={`price ${index % 2 === 0 ? 'green' : 'blue'}`}>
                              <input
                                type="number"
                                name={`quantity_${index}`}
                                id={`quantity_${index}`}
                                // max={parseInt(data.stock_quantity)}
                                min={0}
                                className="txt"
                                placeholder="0"
                                value={(selectedItems.find(selectedItem => selectedItem.variation_id === data.id) || {}).quantity || 0}
                                onChange={(e) => handleInputChange(e, data, data.attributes.pa_size, product)} />
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  </>
                }
                <tr className="price_table_bottom_deatil">
                  <div className="price_table_items">
                    <p>Items:    <span>{sizes.length > 0 ? totalQuantity :

                      <input className="price_quantity"
                        type="number"
                        value={singleTotalQuantity}
                        onChange={handleInputChangeSingleValue}
                      />
                    }</span></p>
                  </div>
                  <div className="price_table_items">
                    <p>Price:    <span dangerouslySetInnerHTML={{ __html: product?.price_html }} /></p>
                  </div>
                  <div className="price_total">
                    <p>Total: <span className="product_price">{totalPrice.toFixed(2)} €</span></p>
                    <div className="product_item_right">
                      <button className="btn" onClick={() => handleSubmit(variationsList.length > 0 ? "" : product)} href="#">add to cart</button>
                    </div>
                  </div>
                </tr>
              </tbody>

            </table>
          </div>



          <div className="product_item_detail">
            <div className="product_item_left">

              <div className="product_order">
                <div className="product_order_item green">
                  <p>In Stock</p>
                </div>

                <div className="product_order_item red">
                  <p>Out of Stock </p>
                </div>

                <div className="product_order_item orange">
                  <p>Last Units</p>
                </div>

                <div className="product_order_item yellow" >
                  <p>Back-order</p>
                </div>

                <div className="product_order_item blue">

                  <p>Pre-order</p>
                </div>
              </div>
            </div>

          </div>

          {/* Product Sku */}
          <div className="product_item_sku">
            <h3><span>-</span>INFO</h3>
            <p><span>Retail Price</span><span dangerouslySetInnerHTML={{ __html: product?.price_html }} ></span></p>

            <p><span>SKU</span>{product.sku}</p>
            <p><span>Categories</span>{categoryNames.join(', ')}</p>
          </div>
          {product?.short_description &&
            <div className="product_dec">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <h3>Description</h3>
                </AccordionSummary>
                <AccordionDetails>
                  <p dangerouslySetInnerHTML={{ __html: product?.short_description }} />
                </AccordionDetails>
              </Accordion>
            </div>

          }
        </div>
      </div>
    </div>
  )
}
