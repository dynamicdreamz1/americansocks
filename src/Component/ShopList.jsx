import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import Skeleton from './Skeleton';
import ShopBox from "./ShopBox"
import { useNavigate } from 'react-router-dom';


export default function ShopList({ loading, setRequestInProgress, product, setCurrentPage, requestInProgress }) {

  const navigate = useNavigate();
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const isMobile = window.innerWidth <= 768;


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



  const handleMouseEnter = (productId) => {
    setHoveredProduct(productId);
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };

  return (
    <section className="shop">
      <div className="container">
        <div className="shop_wrap">

          {product.length > 0 ? (
            product.map((item, index) => (
              <div className="shop_box" key={index}>
                <div
                  onClick={() => redirectShopDetail(item)}
                  className='shop_box_wrap'
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  {!isMobile ?
                    <div className="product_image">
                      {hoveredProduct === item.id && item.images[1]?.urls ?
                        <div dangerouslySetInnerHTML={{ __html: item?.images[1]?.urls?.woocommerce_thumbnail }} />
                        :
                        <div dangerouslySetInnerHTML={{ __html: item?.images[0]?.urls?.woocommerce_thumbnail }} />
                      }

                    </div>

                    :
                    <ShopBox images={item.images} />
                  }

                  <div className="product_text">
                    <h3>{item?.name}</h3>
                    <p dangerouslySetInnerHTML={{ __html: item?.price_html }}></p>
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
