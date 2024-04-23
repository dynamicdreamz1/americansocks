import React, { useState } from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { arrowprev} from "../assets/Images/index"
import { calculateTotalQuantity } from "../Common/function";
import { addToCart, addToCartProducts } from "../services/order";
import { toast ,ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";


export default function Productdeatils({ product, variationsList }) {

  const [productImage, setProductImages] = useState(product?.images[0]?.src)
  const [selectedItems, setSelectedItems] = useState([]);
  const totalQuantity = calculateTotalQuantity(selectedItems, product.id);
  const totalPrice = totalQuantity * parseFloat(product.price);



  const categoryNames = product?.categories.map(category => category.name);
  const sizes = variationsList?.map(variation => variation.attributes.find(attr => attr.name === "Size").option);


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

  const handleProductImages = (imageUrl) => {
    setProductImages(imageUrl)

  }

  const handleInputChange = (event, data, selectedSize, item) => {
    const { value } = event.target;
    let intValue = parseInt(value);
    const stockNumber = parseInt(data?.stock_quantity);

    const maxStockNumber = parseInt(stockNumber);
    if (intValue > maxStockNumber || isNaN(intValue)) {
      intValue = 0; // Reset to 0 if value exceeds max stock or is not a number
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
        if (item) {
            const object = {
                quantity: 1,
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


  return (
    <div className="container">
     <ToastContainer />
     <Link to="/shop" >
                  <div className="back_btn" >
                    <img src={arrowprev} />
                  </div>
                  </Link>
      <div className="product_detail_wrapper">
        <div className="product_detail_left">
          <div className="container">
     
              <div className="product_detail_slider">
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
                      <div className="product_slider_item" key={index} onClick={() => handleProductImages(relatedProduct.urls.woocommerce_single)}>
                        <img src={relatedProduct.urls.woocommerce_thumbnail} alt={relatedProduct.alt} />
                      </div>
                    ))}
                  </Slider>

                </div>
              </div>
          
          </div>
        </div>
        <div className="product_detail_right">
          <h3 className="product_title">{product.name}</h3>
       

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
                    {variationsList.map((data, index) => {

                      return (
                        <td key={index}>
                          <div className={`price ${index % 2 === 0 ? 'green' : 'blue'}`}>
                            <input
                              type="number"
                              name={`quantity_${index}`}
                              id={`quantity_${index}`}
                              max={parseInt(data.stock_quantity)}
                              min={0}
                              className="txt"
                              placeholder="0"
                              value={(selectedItems.find(selectedItem => selectedItem.variation_id === data.id) || {}).quantity || 0}
                              onChange={(e) => handleInputChange(e, data, data.attributes[0].option, product)}
                            />
                          </div>
                        </td>
                      )
                    })}
                  </tr>

                  <tr className="price_table_bottom_deatil">
                    <div className="price_table_items">  
                      <p>items:    <span>{sizes.length > 0 ? totalQuantity : 1}</span></p>
                    </div>
                    <div className="price_total">
                      <p>Total: <span className="product_price">{totalPrice} €</span></p>
                      <div className="product_item_right">
                          <button className="btn" onClick={() => handleSubmit(variationsList.length > 0 ? "" : product)} href="#">add to cart</button>
                      </div>
                    </div>
                  </tr>
                </tbody>

              </table>
            </div>

          }

          <div className="product_item_detail">
            <div className="product_item_left">
            
              <div className="product_order">
                <div className="product_order_item green">
                  <p>Disponible</p>
                </div>

                <div className="product_order_item red">
                  <p>No Disponible </p>
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
            <p><span>SKU</span>{product.sku}</p>
            <p><span>Categories</span>{categoryNames.join(', ')}</p>
          </div>

          <div className="product_dec">
            <h3><span>-</span>Description</h3>
            <p dangerouslySetInnerHTML={{ __html: product?.short_description }} />
          </div>


        </div>
      </div>
    </div>
  )
}
