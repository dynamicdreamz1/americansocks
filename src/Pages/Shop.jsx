import React, { useEffect, useState } from 'react'
import Shopfilter from "../Component/Shopfilter"
import ShopList from "../Component/ShopList"
import { getProductAttribute, productList } from "../services/shop"


const ShopComponent = () => {
    const [product, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [attributeSize, setAttributeSize] = useState([]);

    const [filters, setFilters] = useState({
        selectSize: []
    });


    useEffect(() => {
        setCurrentPage(1); // Reset currentPage to 1 when filters change
        setProducts([])
    }, [filters]);


    useEffect(() => {

        const fetchData = async () => {
            setLoading(true)
            const result = await productList(currentPage,filters);
            setProducts(prevProducts => [...prevProducts, ...result]);
            if (result) {
                setLoading(false)
            }
        }

        fetchData();
    }, [currentPage,filters]);


    useEffect(() => {

        const getAttribute = async () => {
            const result = await getProductAttribute();
            setAttributeSize(result.map(({id, name, slug}) => ({id, name, slug})))
        }

        getAttribute();
    }, []);


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
            <Shopfilter  setProducts={setProducts} filters={filters} attributeSize={attributeSize} setFilters={setFilters} />
            <Loader />
            <ShopList product={product} setCurrentPage={setCurrentPage} />
        </>
    )
}

export default ShopComponent