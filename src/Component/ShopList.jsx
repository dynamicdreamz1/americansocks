import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import Imgix from "react-imgix";
import Skeleton from './Skeleton';
import { Link, useNavigate } from 'react-router-dom';


export default function ShopList({ loading, setRequestInProgress, product, setCurrentPage, requestInProgress }) {

  const navigate = useNavigate();

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (scrollY + windowHeight >= documentHeight - 100) {
      setCurrentPage(prevPage => prevPage + 1);
      setRequestInProgress(true)
    }
  };

  const redirectShopDetail = (product) => {
    navigate(`/product/${product.slug}`, { state: { product: product } });
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
    if (!requestInProgress && product.length > 0) {
      window.addEventListener('scroll', debouncedHandleScroll);
      return () => {
        window.removeEventListener('scroll', debouncedHandleScroll);
      };
    }
  }, [requestInProgress, product]);


  return (
    <section className="shop">
      <div className="container">
        <div className="shop_wrap">

          {product.length > 0 ? (
            product.map((product, index) => (
              <div className="shop_box" key={index}>
                <div className='shop_box_wrap'>
                {/* <Link to={`/product/${product.slug}`} className="product_image"> */}
                <div onClick={() => redirectShopDetail(product)} className="product_image">
                  {product?.images && product.images.length > 0 && (
                    // <img
                      //   src={product.images[0]?.src?.replace('.jpg', '-300x300.jpg')} // Modify the URL here
                      //   alt={product.images[0]?.alt}
                    // />
                    <img
                    src={product.images[0]?.src}
                    alt={product.images[0]?.alt}
                    />
               


                  )}
                </div>
                {/* </Link> */}
                <div className="product_text">
                  <h3>{product?.name}</h3>
                  <p dangerouslySetInnerHTML={{ __html: product?.price_html }}></p>
                </div>
                </div>
              </div>
            ))
          ) : (
            <>
              {loading && <Skeleton />}
            </>
          )}
        </div>
        <div className="loade_wrap">
          {requestInProgress && product.length > 0 && <CircularProgress />}
        </div>

        <div className="loade_wrap">
          {product.length === 0 && !loading && <h1>No products found. Please reset filters.</h1>}
        </div>
      </div>
    </section>
  );
}
