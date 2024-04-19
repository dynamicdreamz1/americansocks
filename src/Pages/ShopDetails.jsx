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

  }, [product])

  console.log("relatedProductList", relatedProductList);
  console.log("product", product);



  return (
    <>
      <Productdeatils product={product} variationsList={variationsList} />
      <Relatedproductslider relatedProductList={relatedProductList} />
    </>

  )
}

export default ShopDetailMain