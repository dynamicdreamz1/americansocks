import React, { useEffect, useState } from 'react'
import Shopfilter from "../Component/Shopfilter"
import ShopList from "../Component/ShopList"
import { productList } from "../services/shop"


const ShopComponent = () => {
    const [product, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);



    useEffect(() => {

        const fetchData = async () => {
            setLoading(true)
            const result = await productList(currentPage);
            setProducts(prevProducts => [...prevProducts, ...result]);
            if (result) {
                setLoading(false)
            }
        }

        fetchData();
    }, [currentPage]);


    const Loader = () => (
        loading && (
            <div className="loader-overlay">
                <div className="loader-container">
                    <div className="loader"></div>
                    <div className="loader-text">Loading...</div>
                </div>
            </div>
        )
    );

    return (
        <>
            <Shopfilter />
            <Loader />
            <ShopList product={product} setCurrentPage={setCurrentPage} />
        </>
    )
}

export default ShopComponent