import React, { useEffect, useState } from 'react'
import Shopfilter from "../Component/Shopfilter"
import ShopList from "../Component/ShopList"
import { getQueryStringParams } from "../Common/function"
import { productList, getProductAttribute } from '../services/shop'; // Import the api instance and functions
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import Loader from '../Component/Loader';



const ShopComponent = () => {
    const [product, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [attributeSize, setAttributeSize] = useState([]);
    const queryParams = getQueryStringParams()

    const [filters, setFilters] = useState({
        selectSize: queryParams.seize || []
    });
    const location = useLocation();
    const navigate = useNavigate();

    const updateQueryString = (param, value) => {
        const currentQuery = queryString.parse(location.search, { arrayFormat: 'comma' });
        if (Array.isArray(value)) {
            currentQuery[param] = value;
        } else if (typeof value === 'string') {
            currentQuery[param] = value.split(',');
        } else {
            currentQuery[param] = value?.toString();
        }

        const newQueryString = queryString.stringify(currentQuery, { arrayFormat: 'comma' });
        navigate(`${location.pathname}?${newQueryString}`);
    }

    useEffect(() => {
        setCurrentPage(1); // Reset currentPage to 1 when filters change
        setProducts([])
    }, [filters]);


    useEffect(() => {

        const fetchData = async () => {
            setLoading(true)
            const result = await productList(currentPage, filters);
            setProducts(prevProducts => [...prevProducts, ...result]);
            if (result) {
                setLoading(false)
            }
        }

        fetchData();
    }, [currentPage, filters]);


    useEffect(() => {

        const getAttribute = async () => {
            const result = await getProductAttribute();
            setAttributeSize(result.map(({ id, name, slug }) => ({ id, name, slug })))
        }
        getAttribute();
    }, []);



    useEffect(() => {
        updateQueryString("seize",filters.selectSize)
    }, [filters]); 


 
    return (
        <>
            <Shopfilter
                setProducts={setProducts}
                filters={filters}
                attributeSize={attributeSize}
                setFilters={setFilters} 
                updateQueryString={updateQueryString}
                />
            <Loader loading={loading}  />
            <ShopList product={product} setCurrentPage={setCurrentPage} />
        </>
    )
}

export default ShopComponent