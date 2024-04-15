import React, { useEffect } from 'react'
import { product11 } from "../assets/Images/index"
import Skeleton from './Skeleton';


export default function ShopList({ product, setCurrentPage }) {

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (scrollY + windowHeight >= documentHeight - 100) {
      setCurrentPage(prevPage => prevPage + 1);
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
    window.addEventListener('scroll', debouncedHandleScroll);
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, []);

  console.log("product",product);


  return (

    <section className="shop">
      <div className="container">
        <div className="shop_wrap">
          {product.length > 0 ? product.map((product, index) => (
            <div className="shop_box" key={index}>
              <a href={`/product/${product?.slug}`}>
                <div className="product_image">
                  <img src={product?.images[0]?.src} alt={product?.images[0]?.alt} />
                  {/* {product.new && <div className="product_tag">NEW IN! </div>} */}
                </div>
                <div className="product_text">
                  <h3>{product?.name}</h3>
                  <p dangerouslySetInnerHTML={{ __html: product?.price_html }}></p>
                </div>
              </a>
            </div>
          ))
        :
        <Skeleton />
        }
        </div>
      </div>
    </section>
  )
}
