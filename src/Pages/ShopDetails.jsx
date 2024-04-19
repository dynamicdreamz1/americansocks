import React from 'react'
import Productdeatils from "../Component/Productdeatils"
import Relatedproductslider from "../Component/Relatedproductslider"
import { useLocation } from 'react-router-dom';

function ShopDetailMain() {
  const location = useLocation();
  return (
    <>
        <Productdeatils product={location.state.product} />
        <Relatedproductslider product={location.state.product} />
    </>

  )
}

export default ShopDetailMain