import React, { useEffect, useState } from 'react'
import Productdeatils from "../Component/Productdeatils"
import Relatedproductslider from "../Component/Relatedproductslider"
import { useLocation } from 'react-router-dom';
import { getProductVariationsList, productList, relatedProductListApi } from '../services/shop';

function ShopDetailMain() {
  const location = useLocation();
  const product = location.state.product
  const [variationsList, setVariationsList] = useState([])
  const [relatedProductList, setRelatedProductList] = useState([])
  const [singleProduct, setsingleProduct] = useState()


  useEffect(() => {
    const fetchData = async () => {
      const result = await getProductVariationsList(product.id);
      setVariationsList(result)
    };

    fetchData();


    const fetchRelatedProduct = async () => {
      const result = await relatedProductListApi(100, { include: product.related_ids });
      setRelatedProductList(result)
    };

    fetchRelatedProduct();

    const getSingleProduct = async () => {
      const result = await relatedProductListApi(100, { include: [product.id] });
      
      setsingleProduct(result[0])
    };

    getSingleProduct();

  }, [product])


  console.log("singleProduct",singleProduct);



  return (
    <>
   {singleProduct ?   <Productdeatils product={singleProduct} variationsList={variationsList} /> : ""} 
      <Relatedproductslider relatedProductList={relatedProductList} /> 
      <></>
    </>

  )
}

export default ShopDetailMain