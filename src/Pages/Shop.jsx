import React, { useEffect, useState } from 'react'
import Shopfilter from "../Component/Shopfilter"
import ShopList from "../Component/ShopList"
import { getQueryStringParams } from "../Common/function"
import { productList, getProductAttribute } from '../services/shop'; // Import the api instance and functions
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
// import Loader from '../Component/Loader';



const ShopComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [product, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [attributeSize, setAttributeSize] = useState([]);
    const queryParams = getQueryStringParams()

    const [filters, setFilters] = useState({
        selectSize: queryParams?.seize?.map(Number) || [],
        orderBy: queryParams?.orderBy && queryParams?.orderBy[0] || "",
        order: queryParams?.orderBy && queryParams?.orderBy[0] === 'title' ? 'asc' : 'desc'|| ""
    });

    console.log("filters",filters);

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
        setCurrentPage(1);
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

    console.log("filters", filters);

    return (
        <>
            <Shopfilter
                filters={filters}
                attributeSize={attributeSize}
                setFilters={setFilters}
                updateQueryString={updateQueryString}
            />
            {/* <Loader loading={loading}  /> */}
            <ShopList product={product} setCurrentPage={setCurrentPage} />
        </>
    )
}

export default ShopComponent