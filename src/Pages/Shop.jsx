import React, { useEffect, useState } from 'react'
import Shopfilter from "../Component/Shopfilter"
import ShopList from "../Component/ShopList"
import { productList } from "../services/shop"


const ShopComponent = () => {
    const [product, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {

        const fetchData = async () => {
            const result = await productList(currentPage);
            setProducts(prevProducts => [...prevProducts, ...result]);
        }

        fetchData();
    }, [currentPage]);

    return (
        <>
            <Shopfilter />
            <ShopList product={product} setCurrentPage={setCurrentPage} currentPage={currentPage} />
        </>
    )
}

export default ShopComponent