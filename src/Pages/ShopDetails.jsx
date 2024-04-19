import React, { useEffect, useState } from 'react'
import Productdeatils from "../Component/Productdeatils"
import Relatedproductslider from "../Component/Relatedproductslider"
import { useLocation } from 'react-router-dom';
import { getProductVariationsList } from '../services/shop';

function ShopDetailMain() {
  const location = useLocation();
  const product = location.state.product
  const [variationsList, setVariationsList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProductVariationsList(product.id);
      setVariationsList(result)
    };

    fetchData();

  }, [product])


  return (
    <>
      <Productdeatils product={product} variationsList={variationsList} />
      <Relatedproductslider product={product} />
    </>

  )
}

export default ShopDetailMain