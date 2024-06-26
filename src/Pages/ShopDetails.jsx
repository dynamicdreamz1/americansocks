import React, { useEffect, useState } from 'react'
import Productdeatils from "../Component/Productdeatils"
import Relatedproductslider from "../Component/Relatedproductslider"
import ProductdeatilSkeleton from "../Component/ProductdeatilSkeleton"
import { useParams } from 'react-router-dom';
import { getProductVariationsList, relatedProductListApi } from '../services/shop';

function ShopDetailMain() {
  // const location = useLocation();
  const [variationsList, setVariationsList] = useState([]);
  const [singleProduct, setSingleProduct] = useState();
  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const result = await relatedProductListApi(100, { slug: slug })
      setSingleProduct(result[0])
    };
    if (!singleProduct) {
      fetchData()
    }

  }, [slug]);

  useEffect(() => {


    const fetchVaariationList = async () => {
      const variationList = await getProductVariationsList(singleProduct?.id)
      setVariationsList(variationList)
    };

    if (singleProduct) {
      fetchVaariationList()
    }

  }, [singleProduct])



  return (
    <>
      {singleProduct ?
        <>
          <Productdeatils product={singleProduct} variationsList={singleProduct?.variations_data ? singleProduct?.variations_data : []} />
          <Relatedproductslider relatedProductList={singleProduct} />
        </>
        : <ProductdeatilSkeleton />}
    </>
  )
}

export default ShopDetailMain;
