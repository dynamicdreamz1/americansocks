import React, { useEffect, useState } from 'react'
import Productdeatils from "../Component/Productdeatils"
import Relatedproductslider from "../Component/Relatedproductslider"
import ProductdeatilSkeleton from "../Component/ProductdeatilSkeleton"
import { useLocation, useParams } from 'react-router-dom';
import { getProductVariationsList, relatedProductListApi } from '../services/shop';

function ShopDetailMain() {
  const location = useLocation();
  const [variationsList, setVariationsList] = useState([]);
  const [singleProduct, setSingleProduct] = useState(location?.state?.product);
  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const result = await relatedProductListApi(100, { slug: slug })
      const variationList = await getProductVariationsList(result[0].id)

      setSingleProduct(result[0])
      setVariationsList(variationList)
    };
    if (!singleProduct) {
      fetchData()
    }

  }, [slug]);



  return (
    <>
      {singleProduct ?
        <>
           <Productdeatils product={singleProduct} variationsList={variationsList} /> 
          <Relatedproductslider relatedProductList={singleProduct} /> 
        </>
        : <ProductdeatilSkeleton />}
    </>
  )
}

export default ShopDetailMain;
