import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { product11 } from "../assets/Images/index";
import Skeleton from './Skeleton';

export default function ShopList({setRequestInProgress, product, setCurrentPage,requestInProgress }) {
  const [loading, setLoading] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (scrollY + windowHeight >= documentHeight - 100) {
      setCurrentPage(prevPage => prevPage + 1);
      setRequestInProgress(true)
      setLoading(true)
    }
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedHandleScroll = debounce(handleScroll, 200); // Adjust the debounce delay as needed

  useEffect(() => {
    if (!requestInProgress) {  
      window.addEventListener('scroll', debouncedHandleScroll);
      return () => {
        window.removeEventListener('scroll', debouncedHandleScroll);
      };
    }
  }, [requestInProgress]);

  useEffect(() => {
    setLoading(false); // Reset loading state when new products are loaded
  }, [product]);

  return (
    <section className="shop">
      <div className="container">
      { <CircularProgress />} 
        <div className="shop_wrap">
          {product.length > 0 ? (
            product.map((product, index) => (
              <div className="shop_box" key={index}>
                <a href={`/product/${product?.slug}`}>
                  <div className="product_image">
                    <img src={product?.images[0]?.src || product11} alt={product?.images[0]?.alt} />
                    {/* {product.new && <div className="product_tag">NEW IN! </div>} */}
                  </div>
                  <div className="product_text">
                    <h3>{product?.name}</h3>
                    <p dangerouslySetInnerHTML={{ __html: product?.price_html }}></p>
                  </div>
                </a>
              </div>
            ))
          ) : (
            <Skeleton /> // Render Skeleton when product list is empty
          )}
        </div>
        {/* {loading && <CircularProgress />}  */}
      </div>
    </section>
  );
}
