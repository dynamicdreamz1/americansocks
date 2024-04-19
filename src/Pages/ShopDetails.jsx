import React, { useEffect, useState } from 'react'
import Productdeatils from "../Component/Productdeatils"
import Relatedproductslider from "../Component/Relatedproductslider"
import ProductdeatilSkeleton from "../Component/ProductdeatilSkeleton"
import { useLocation } from 'react-router-dom';
import { getProductVariationsList, relatedProductListApi } from '../services/shop';

function ShopDetailMain() {
  const location = useLocation();
  const product = location.state.product;
  const [variationsList, setVariationsList] = useState([]);
  const [relatedProductList, setRelatedProductList] = useState([]);
  const [singleProduct, setSingleProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [variations, relatedProducts, singleProd] = await Promise.all([
        getProductVariationsList(product.id),
        relatedProductListApi(100, { include: product.related_ids }),
        relatedProductListApi(100, { include: [product.id] })
      ]);
      setVariationsList(variations);
      setRelatedProductList(relatedProducts);
      setSingleProduct(singleProd[0]);
    };

    fetchData();

  }, [product]);

  return (
    <>
      <ProductdeatilSkeleton/>
      {/* {singleProduct ? <Productdeatils product={singleProduct} variationsList={variationsList} /> : <ProductdeatilSkeleton/>}  */}
      <Relatedproductslider relatedProductList={relatedProductList} /> 
    </>
  )
}

export default ShopDetailMain;
